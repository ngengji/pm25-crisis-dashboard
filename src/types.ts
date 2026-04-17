// ─── Shared TypeScript interfaces for PM2.5 Crisis Dashboard ───────────────

export type SectionId =
  | 'overview'
  | 'severity'
  | 'causes'
  | 'measures'
  | 'evidence'
  | 'sti'
  | 'conclusion';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type EvidenceStrength = 'strong' | 'partial' | 'insufficient';
export type PolicyReadiness = 'high' | 'medium' | 'low';
export type MeasureCategory = 'prevention' | 'response' | 'recovery';
export type GapLevel = 'covered' | 'partial' | 'gap';

// ─── Section 1: Overview ────────────────────────────────────────────────────

export interface KPI {
  id: string;
  label: string;
  value: string;
  unit: string;
  sublabel: string;
  trend: 'up' | 'down' | 'stable';
  trendLabel: string;
  severity: RiskLevel;
  icon: string; // lucide icon name
}

export interface TrendPoint {
  month: string;
  north: number;
  central: number;
  northeast: number;
  east: number;
  south: number;
  standard: number; // Thai standard 37.5 μg/m³
  who: number;      // WHO guideline 15 μg/m³
}

// ─── Section 2: Severity ────────────────────────────────────────────────────

export type Region = 'north' | 'central' | 'northeast' | 'east' | 'south';

export interface ProvinceSeverity {
  id: string;
  provCode: number;          // รหัสจังหวัดมาตรฐาน (PROV_CODE ใน GeoJSON)
  name: string;
  region: Region;
  regionLabel: string;
  areaType: AreaTypeId;
  avgPM25: number;
  maxPM25: number;
  daysExceeded: number;
  population: number;
  riskLevel: RiskLevel;
  peakMonth: string;
}

// ─── Section 3: Causes ──────────────────────────────────────────────────────

export type AreaTypeId = 'forest' | 'urban' | 'agricultural' | 'border';

export interface CauseItem {
  id: string;
  name: string;
  contribution: number; // percentage 0–100
  description: string;
  color: string;
}

export interface AreaCauseProfile {
  id: AreaTypeId;
  label: string;
  labelShort: string;
  exampleProvinces: string[];
  season: string;
  causes: CauseItem[];
  keyMessage: string;
  icon: string;
}

// ─── Section 4: Measures ────────────────────────────────────────────────────

export interface Measure {
  id: string;
  name: string;
  category: MeasureCategory;
  relatedCauses: string[];
  areaTypes: AreaTypeId[];
  description: string;
  implementingAgency: string;
  effectiveness: 'high' | 'medium' | 'low';
  timeframe: 'immediate' | 'short' | 'medium' | 'long';
  timeframeLabel: string;
}

// ─── Section 5: Research Evidence ───────────────────────────────────────────

export interface ResearchProject {
  id: string;
  title: string;
  year: number;
  hostAgency: string;
  theme: string;
  areaRelevance: AreaTypeId[];
  policyReadiness: PolicyReadiness;
  linkedMeasures: string[];
  evidenceStrength: EvidenceStrength;
  abstract: string;
  status: 'completed' | 'ongoing';
}

// ─── Section 6: STI Alignment ───────────────────────────────────────────────

export interface STIDirection {
  id: string;
  label: string;
  labelShort: string;
  description: string;
  color: string;
}

export interface AlignmentRow {
  issue: string;
  cause: string;
  measure: string;
  researchIds: string[];
  stiDirectionId: string;
  gapLevel: GapLevel;
  note: string;
}
