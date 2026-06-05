/**
 * Shared domain types used across the UI and mock data layer.
 */

export type Regime = "EU" | "UK" | "US" | "IN";

export type UserRole =
  | "importer"
  | "exporter"
  | "verifier"
  | "consultant"
  | "broker"
  | "analyst"
  | "admin";

export type VerificationStatus = "verified" | "pending" | "unverified" | "rejected";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface ForumThread {
  id: string;
  channel: string;
  regime: Regime | "GLOBAL";
  title: string;
  authorName: string;
  authorRole: UserRole;
  replyCount: number;
  upvotes: number;
  expertEndorsed: boolean;
  lastActivity: string; // ISO
  preview: string;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  authorName: string;
  authorRole: UserRole;
  body: string;
  upvotes: number;
  createdAt: string; // ISO
  expertEndorsed: boolean;
}

export interface RegDocument {
  id: string;
  title: string;
  regime: Regime | "GLOBAL";
  docType: "regulation" | "guidance" | "template" | "faq" | "sector-guide";
  sectors: string[];
  lastReviewed: string; // ISO
  sourceUrl: string;
  summary: string;
  keyPoints: string[];
  citations: { ref: string; text: string }[];
  status: "live" | "staged" | "review";
}

export interface ExpertProfile {
  id: string;
  name: string;
  company: string;
  profileType: "verifier" | "consultant" | "broker" | "law_firm";
  regimes: Regime[];
  sectors: string[];
  country: string;
  accreditations: string[];
  rating: number;
  reviewCount: number;
  enhancedListing: boolean;
  bio: string;
  reviews: { author: string; rating: number; body: string; date: string }[];
}

export interface RegAlert {
  id: string;
  regime: Regime | "GLOBAL";
  type: "regulatory_change" | "price_update" | "deadline_reminder" | "new_guidance";
  urgency: "critical" | "high" | "medium" | "low";
  title: string;
  summary: string;
  detail: string;
  date: string; // ISO
  sourceUrl: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: ConfidenceLevel;
  refused?: boolean;
  asOfDate?: string;
  citations?: {
    ref: string;
    docTitle: string;
    excerpt: string;
    lastReviewed: string;
  }[];
  keyPoints?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  regime: Regime | "ALL";
  updatedAt: string; // ISO
  messages: ChatMessage[];
}
