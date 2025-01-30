// Base interfaces
export interface Vulnerability {
	type: string;
	severity: 'HIGH' | 'MEDIUM' | 'LOW';
	description: string;
	evidence?: string;
	location?: string;
}

// Contract Analysis types
export interface AnalysisResult {
	contract_address: string;
	code_size: number;
	vulnerabilities: Vulnerability[];
	risk_score: number;
	timestamp: number;
	transaction_summary: {
		total_transactions: string;
		unique_senders: string;
		volume_24h: string;
		largest_transaction: string;
		transaction_frequency: string;
	};
	holder_stats: {
		total_holders: number;
		top_holder_concentration: number;
		holder_distribution: string;
		average_holding_time: string;
	};
}

export interface AnalysisState {
	isLoading: boolean;
	error: string | null;
	data: AnalysisResult | null;
}

// Gas Analysis types
export interface GasAnalysisResult {
	average_gas_used: number;
	highest_gas_operation: string;
	optimization_suggestions: string[];
	estimated_savings: number;
	historical_gas_trends: Array<{
		date: string;
		average_gas: number;
	}>;
}

export interface GasAnalysisState {
	isLoading: boolean;
	error: string | null;
	data: GasAnalysisResult | null;
}

// Token Analysis types
export interface TokenAnalysisResult {
	token_type: string;
	total_supply: number;
	circulating_supply: number;
	holder_metrics: {
		total_holders: number;
		top_holder_concentration: number;
		distribution_gini: number;
	};
	trading_metrics: {
		volume_24h: number;
		liquidity: number;
		price_impact: number;
	};
	risk_indicators: Array<{
		type: string;
		severity: 'HIGH' | 'MEDIUM' | 'LOW';
		description: string;
	}>;
}

export interface TokenAnalysisState {
	isLoading: boolean;
	error: string | null;
	data: TokenAnalysisResult | null;
}

// Contract History types
export interface ContractHistoryResult {
	contract_address: string;
	analysis_period: {
		from_block: number;
		to_block: number;
		block_range: number;
	};
	transactions: {
		total_count: number;
		unique_senders: number;
		unique_receivers: number;
		total_volume: number;
		successful_ratio: number;
		items: Array<{
			timestamp: number;
			transaction_hash: string;
			from_address: string;
			to_address: string;
			value: number;
			block_number: number;
			gas_used: number;
			success: boolean;
		}>;
	};
	events: {
		total_count: number;
		event_types: string[];
		items: Array<{
			event_type: string;
			timestamp: number;
			transaction_hash: string;
			block_number: number;
			details: Record<string, unknown>;
		}>;
	};
	modifications: {
		total_count: number;
		modification_types: string[];
		items: Array<{
			timestamp: number;
			transaction_hash: string;
			block_number: number;
			modification_type: string;
			old_value: string | null;
			new_value: string | null;
		}>;
	};
}

export interface ContractHistoryState {
	isLoading: boolean;
	error: string | null;
	data: ContractHistoryResult | null;
}
