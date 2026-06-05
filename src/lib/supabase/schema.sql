-- =====================================================================
-- CarbonGate — CBAM Platform Database Schema
-- Postgres + pgvector (Supabase). Regime tags thread through EVERYTHING:
-- this is what makes the platform multi-regime by design, not EU-only with
-- bolt-ons. Every answer is auditable (corpus version + chunk IDs + scores).
--
-- 24 core tables. Source of truth: CBAM-SPEC-001 v1.0.
-- =====================================================================

create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
create type regime_code as enum ('EU', 'UK', 'US', 'IN', 'CA', 'AU', 'GLOBAL');
create type user_role as enum (
  'importer', 'exporter', 'verifier', 'consultant', 'broker', 'analyst', 'admin'
);
create type verification_status as enum ('unverified', 'pending', 'verified', 'rejected');
create type corpus_status as enum ('draft', 'staged', 'review', 'live', 'archived');
create type confidence_level as enum ('high', 'medium', 'low');
create type alert_type as enum ('regulatory_change', 'price_update', 'deadline_reminder', 'new_guidance');
create type alert_urgency as enum ('critical', 'high', 'medium', 'low');
create type subscription_tier as enum ('free', 'professional', 'enterprise');

-- ---------------------------------------------------------------------
-- 1. regimes — the carbon-border regimes the platform covers
-- ---------------------------------------------------------------------
create table regimes (
  code              regime_code primary key,
  name              text not null,
  status            text not null,           -- e.g. 'in_force', 'legislated', 'proposed'
  financial_live    date,                     -- when the financial mechanism starts
  mechanism         text not null,            -- 'certificates' | 'tax' | 'monitoring'
  competent_body    text,
  tier              smallint not null default 3, -- 1 launch, 2 monitor, 3 watch
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2. roles — role catalogue (capabilities / labels)
-- ---------------------------------------------------------------------
create table roles (
  id                uuid primary key default uuid_generate_v4(),
  key               user_role not null unique,
  label             text not null,
  description       text
);

-- ---------------------------------------------------------------------
-- 3. users — platform members
-- ---------------------------------------------------------------------
create table users (
  id                uuid primary key default uuid_generate_v4(), -- mirrors auth.users.id
  email             text not null unique,
  full_name         text,
  role              user_role not null default 'importer',
  primary_regime    regime_code not null default 'EU',
  verification_status verification_status not null default 'unverified',
  company_id        uuid,
  avatar_url        text,
  created_at        timestamptz not null default now(),
  last_active_at    timestamptz
);

-- ---------------------------------------------------------------------
-- 4. companies — organisations members belong to
-- ---------------------------------------------------------------------
create table companies (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  country           text,
  vat_number        text,
  eori_number       text,                     -- EU customs identifier
  primary_regime    regime_code not null default 'EU',
  sectors           text[] default '{}',
  created_at        timestamptz not null default now()
);
alter table users
  add constraint users_company_fk foreign key (company_id) references companies(id);

-- ---------------------------------------------------------------------
-- 5. verification_requests — the trust gate / verification flywheel
-- ---------------------------------------------------------------------
create table verification_requests (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references users(id) on delete cascade,
  company_id        uuid references companies(id),
  role              user_role not null,
  regime            regime_code not null,
  status            verification_status not null default 'pending',
  evidence_doc_id   uuid,
  reviewer_id       uuid references users(id),
  submitted_at      timestamptz not null default now(),
  reviewed_at       timestamptz,
  notes             text
);

-- ---------------------------------------------------------------------
-- 6. documents — user-uploaded files (GDPR-sensitive: verification docs etc.)
-- ---------------------------------------------------------------------
create table documents (
  id                uuid primary key default uuid_generate_v4(),
  owner_id          uuid references users(id) on delete set null,
  company_id        uuid references companies(id),
  regime            regime_code,
  storage_path      text not null,
  filename          text not null,
  mime_type         text,
  doc_kind          text,                     -- 'verification' | 'emissions' | 'other'
  retention_until   date,                     -- 5-year retention rule
  created_at        timestamptz not null default now()
);
alter table verification_requests
  add constraint vr_evidence_fk foreign key (evidence_doc_id) references documents(id);

-- ---------------------------------------------------------------------
-- 7. corpus_documents — authoritative regulatory source documents
-- ---------------------------------------------------------------------
create table corpus_documents (
  id                uuid primary key default uuid_generate_v4(),
  regime            regime_code not null,
  title             text not null,
  doc_type          text not null,            -- 'regulation' | 'guidance' | 'template' | 'faq'
  source_url        text,
  sectors           text[] default '{}',
  status            corpus_status not null default 'draft',
  published_at      date,
  last_reviewed     date,                      -- "as of" date — non-negotiable
  reviewer_id       uuid references users(id),
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 8. corpus_versions — versioned snapshots of the corpus
-- ---------------------------------------------------------------------
create table corpus_versions (
  id                uuid primary key default uuid_generate_v4(),
  regime            regime_code not null,
  version_label     text not null,            -- e.g. '2026.1'
  is_live           boolean not null default false,
  created_by        uuid references users(id),
  created_at        timestamptz not null default now(),
  notes             text
);

-- ---------------------------------------------------------------------
-- 9. corpus_chunks — structure-aware chunks with embeddings (pgvector)
-- ---------------------------------------------------------------------
create table corpus_chunks (
  id                uuid primary key default uuid_generate_v4(),
  document_id       uuid not null references corpus_documents(id) on delete cascade,
  corpus_version_id uuid references corpus_versions(id),
  regime            regime_code not null,
  chunk_index       integer not null,
  content           text not null,
  article_ref       text,                     -- e.g. 'Art. 7(2)'
  embedding         vector(3072),             -- text-embedding-3-large
  token_count       integer,
  created_at        timestamptz not null default now()
);
create index corpus_chunks_regime_idx on corpus_chunks (regime);

-- ---------------------------------------------------------------------
-- 10. questions — every question asked of the AI
-- ---------------------------------------------------------------------
create table questions (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references users(id) on delete set null,
  regime            regime_code not null,
  intent            text,                     -- 'factual' | 'calc' | 'how_to'
  body              text not null,
  in_scope          boolean,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 11. answers — AI responses (auditable: corpus version + scores)
-- ---------------------------------------------------------------------
create table answers (
  id                uuid primary key default uuid_generate_v4(),
  question_id       uuid not null references questions(id) on delete cascade,
  regime            regime_code not null,
  body              text not null,
  confidence        confidence_level not null,
  refused           boolean not null default false,
  corpus_version_id uuid references corpus_versions(id),
  faithfulness_score numeric(4,3),
  context_precision  numeric(4,3),
  as_of_date        date,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 12. answer_citations — citation integrity (each cited chunk must exist)
-- ---------------------------------------------------------------------
create table answer_citations (
  id                uuid primary key default uuid_generate_v4(),
  answer_id         uuid not null references answers(id) on delete cascade,
  chunk_id          uuid references corpus_chunks(id),
  document_id       uuid references corpus_documents(id),
  article_ref       text,
  excerpt           text,
  rank              smallint,
  relevance_score   numeric(4,3)
);

-- ---------------------------------------------------------------------
-- 13. feedback — flag/endorse → review queue → corpus fix
-- ---------------------------------------------------------------------
create table feedback (
  id                uuid primary key default uuid_generate_v4(),
  answer_id         uuid references answers(id) on delete cascade,
  user_id           uuid references users(id) on delete set null,
  kind              text not null,            -- 'flag' | 'endorse'
  comment           text,
  resolved          boolean not null default false,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 14. calc_results — deterministic engine outputs (audit trail)
-- ---------------------------------------------------------------------
create table calc_results (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references users(id) on delete set null,
  regime            regime_code not null,
  factor_id         text not null,
  factors_version   text not null,
  inputs            jsonb not null,
  outputs           jsonb not null,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 15. default_factors — versioned default emission factor tables
-- ---------------------------------------------------------------------
create table default_factors (
  id                text primary key,         -- e.g. 'steel-bf-bof'
  regime            regime_code not null default 'EU',
  sector            text not null,
  label             text not null,
  cn_code           text,
  default_intensity numeric(8,3) not null,    -- tCO2e/t
  typical_actual    numeric(8,3),
  includes_indirect boolean not null default false,
  version           text not null,
  effective_from    date
);

-- ---------------------------------------------------------------------
-- 16. price_series — ETS price feeds (the only real-time stream)
-- ---------------------------------------------------------------------
create table price_series (
  id                uuid primary key default uuid_generate_v4(),
  regime            regime_code not null,
  market            text not null,            -- 'EU_ETS' | 'UK_ETS'
  price             numeric(10,2) not null,
  currency          text not null,
  observed_at       timestamptz not null default now()
);
create index price_series_market_idx on price_series (market, observed_at desc);

-- ---------------------------------------------------------------------
-- 17. directory_profiles — expert directory listings
-- ---------------------------------------------------------------------
create table directory_profiles (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references users(id) on delete set null,
  display_name      text not null,
  company           text,
  profile_type      text not null,            -- 'verifier' | 'consultant' | 'broker' | 'law_firm'
  regimes           regime_code[] not null default '{}',
  sectors           text[] default '{}',
  countries         text[] default '{}',
  bio               text,
  rating            numeric(2,1),
  review_count      integer not null default 0,
  enhanced_listing  boolean not null default false,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 18. accreditations — verifier/consultant credentials
-- ---------------------------------------------------------------------
create table accreditations (
  id                uuid primary key default uuid_generate_v4(),
  profile_id        uuid not null references directory_profiles(id) on delete cascade,
  name              text not null,            -- e.g. 'EN ISO 14065'
  issuer            text,
  valid_until       date
);

-- ---------------------------------------------------------------------
-- 19. reviews — peer reviews of directory profiles
-- ---------------------------------------------------------------------
create table reviews (
  id                uuid primary key default uuid_generate_v4(),
  profile_id        uuid not null references directory_profiles(id) on delete cascade,
  author_id         uuid references users(id) on delete set null,
  rating            smallint not null check (rating between 1 and 5),
  body              text,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 20. supplier_profiles — non-EU exporter / supplier data
-- ---------------------------------------------------------------------
create table supplier_profiles (
  id                uuid primary key default uuid_generate_v4(),
  company_id        uuid references companies(id),
  name              text not null,
  country           text,
  sectors           text[] default '{}',
  installation_count integer default 0,
  has_verified_data boolean not null default false,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 21. emissions_records — installation-level emissions (cross-regime network)
-- ---------------------------------------------------------------------
create table emissions_records (
  id                uuid primary key default uuid_generate_v4(),
  supplier_id       uuid references supplier_profiles(id) on delete cascade,
  regime            regime_code not null,
  sector            text not null,
  cn_code           text,
  intensity         numeric(8,3) not null,    -- tCO2e/t
  is_verified       boolean not null default false,
  verifier_profile_id uuid references directory_profiles(id),
  reporting_year    integer,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 22. regulatory_updates — detected changes (detect→review→publish)
-- ---------------------------------------------------------------------
create table regulatory_updates (
  id                uuid primary key default uuid_generate_v4(),
  regime            regime_code not null,
  alert_type        alert_type not null,
  urgency           alert_urgency not null default 'medium',
  title             text not null,
  summary           text,
  source_url        text,
  detected_at       timestamptz not null default now(),
  published_at      timestamptz,
  reviewer_id       uuid references users(id)
);

-- ---------------------------------------------------------------------
-- 23. forum_threads — community discussion (regime-tagged channels)
-- ---------------------------------------------------------------------
create table forum_threads (
  id                uuid primary key default uuid_generate_v4(),
  channel           text not null,            -- e.g. 'eu-importers'
  regime            regime_code not null,
  author_id         uuid references users(id) on delete set null,
  title             text not null,
  body              text,
  reply_count       integer not null default 0,
  upvotes           integer not null default 0,
  expert_endorsed   boolean not null default false,
  last_activity_at  timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index forum_threads_channel_idx on forum_threads (channel, last_activity_at desc);

-- ---------------------------------------------------------------------
-- 24. subscriptions — billing / tier (Stripe / merchant-of-record)
-- ---------------------------------------------------------------------
create table subscriptions (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references users(id) on delete cascade,
  tier              subscription_tier not null default 'free',
  status            text not null default 'active',
  current_period_end timestamptz,
  provider          text,                     -- 'stripe' | 'paddle' | 'lemonsqueezy'
  created_at        timestamptz not null default now()
);

-- =====================================================================
-- Notes:
-- * Enable Row Level Security on all user-data tables in production.
-- * EU-region residency + DPAs apply (GDPR + UK GDPR): documents,
--   emissions_records, verification_requests hold sensitive data.
-- * answers + answer_citations + corpus_versions give the full audit trail
--   required for a compliance source-of-truth.
-- =====================================================================
