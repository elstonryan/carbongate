import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetailView } from "@/components/industry/IndustryDetailView";
import { INDUSTRIES, getIndustry } from "@/lib/industries";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ sector: i.id }));
}

export function generateMetadata({
  params,
}: {
  params: { sector: string };
}): Metadata {
  const industry = getIndustry(params.sector);
  if (!industry) return { title: "Industry — CarbonGate" };
  return {
    title: `${industry.name} — Carbon border profile | CarbonGate`,
    description: industry.blurb,
  };
}

export default function IndustryPage({
  params,
}: {
  params: { sector: string };
}) {
  const industry = getIndustry(params.sector);
  if (!industry) notFound();
  return <IndustryDetailView industry={industry} />;
}
