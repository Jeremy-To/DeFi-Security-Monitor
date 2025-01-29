export interface Vulnerability {
  type: string;
  severity: string;
  description: string;
  location?: string;
  evidence?: string;
}

export interface AnalysisResult {
  contract_address: string;
  code_size: number;
  risk_score: number;
  vulnerabilities: Vulnerability[];
  transaction_summary: {
    [key: string]: string | number;
  };
  holder_stats: {
    [key: string]: string | number;
  };
  timestamp: number;
} 