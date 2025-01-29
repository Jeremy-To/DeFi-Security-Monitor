export interface Vulnerability {
  type: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
  description: string
  evidence?: string
  location?: string
}

export interface AnalysisResult {
  contract_address: string
  code_size: number
  vulnerabilities: Vulnerability[]
  risk_score: number
  timestamp: number
  transaction_summary: {
    total_transactions: string
    unique_senders: string
    volume_24h: string
    largest_transaction: string
    transaction_frequency: string
  }
  holder_stats: {
    total_holders: number
    top_holder_concentration: number
    holder_distribution: string
    average_holding_time: string
  }
} 