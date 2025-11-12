const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Problem {
  title: string;
  description: string;
  impact: string;
  cost_per_month: number;
}

export interface AnalysisResponse {
  problems: Problem[];
  company_summary: string;
}

export interface Agent {
  name: string;
  description: string;
  capabilities: string[];
  target_problem: string;
}

export interface GenerateAgentsResponse {
  agents: Agent[];
}

export interface SimulationMetric {
  metric_name: string;
  before: string;
  after: string;
  improvement_percent: number;
}

export interface SimulationResponse {
  metrics: SimulationMetric[];
  total_monthly_savings: number;
  roi_description: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async analyzeCompany(description: string): Promise<AnalysisResponse> {
    return this.fetchApi<AnalysisResponse>('/analyze', {
      method: 'POST',
      body: JSON.stringify({ description }),
    });
  }

  async generateAgents(analysis: AnalysisResponse): Promise<GenerateAgentsResponse> {
    return this.fetchApi<GenerateAgentsResponse>('/generate-agents', {
      method: 'POST',
      body: JSON.stringify(analysis),
    });
  }

  async simulateImpact(problems: Problem[], agents: Agent[]): Promise<SimulationResponse> {
    return this.fetchApi<SimulationResponse>('/simulate', {
      method: 'POST',
      body: JSON.stringify({ problems, agents }),
    });
  }

  async healthCheck(): Promise<{ message: string; version: string; endpoints: string[] }> {
    return this.fetchApi('/');
  }
}

export const apiClient = new ApiClient();