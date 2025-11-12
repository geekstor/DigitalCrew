// Core data types for Kaizen AI

export interface Problem {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  category: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  problemId: string;
  capabilities: string[];
  estimatedImpact: {
    costSavings: number;
    timeSavings: string;
    efficiency: number;
  };
  status: 'generating' | 'ready' | 'deployed';
}

export interface CompanyDescription {
  text: string;
  industry?: string;
  size?: string;
}

export interface AnalysisResult {
  problems: Problem[];
  totalEstimatedCost: number;
  analysisTimestamp: string;
}

export interface SimulationResult {
  before: {
    efficiency: number;
    cost: number;
    timeSpent: string;
  };
  after: {
    efficiency: number;
    cost: number;
    timeSpent: string;
  };
  improvements: {
    costSavings: number;
    timeSavings: string;
    efficiencyGain: number;
  };
}

export interface ImpactMetrics {
  roi: number;
  paybackPeriod: string;
  annualSavings: number;
  productivityGain: number;
}
