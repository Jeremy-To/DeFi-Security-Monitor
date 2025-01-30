import axios from 'axios';
import type { AnalysisResult } from '../types';
import { config } from '../config/environment';

const { API_BASE_URL } = config;

interface ApiError {
	message: string;
	code?: string;
	details?: unknown;
}

const createApiError = (error: unknown, defaultMessage: string): ApiError => {
	if (axios.isAxiosError(error)) {
		return {
			message: error.response?.data?.detail || defaultMessage,
			code: error.code,
			details: error.response?.data,
		};
	}
	return {
		message: error instanceof Error ? error.message : defaultMessage,
		details: error,
	};
};

const handleApiError = (error: unknown, defaultMessage: string): never => {
	const apiError = createApiError(error, defaultMessage);
	console.error('API Error:', apiError);
	throw new Error(apiError.message);
};

export const analyzeContract = async (
	address: string
): Promise<AnalysisResult> => {
	try {
		const response = await axios.post(`${API_BASE_URL}/analyze-contract`, {
			contract_address: address,
		});
		return response.data;
	} catch (error) {
		return handleApiError(error, 'Failed to analyze contract');
	}
};

export const getTokenAnalysis = async (address: string) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/token-analysis/${address}`
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.detail || 'Failed to get token analysis'
			);
		}
		throw error;
	}
};

export const getGasAnalysis = async (address: string) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/gas-analysis/${address}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.detail || 'Failed to get gas analysis'
			);
		}
		throw error;
	}
};

export const getContractHistory = async (
	address: string,
	options: {
		full_analysis?: boolean;
		depth?: 'quick' | 'standard' | 'deep';
		include_holders?: boolean;
		include_governance?: boolean;
		time_range?: '1h' | '24h' | '7d' | '30d';
	} = {}
) => {
	try {
		const params = new URLSearchParams({
			full_analysis: String(options.full_analysis || false),
			analysis_depth: options.depth || 'standard',
			include_holders: String(options.include_holders ?? true),
			include_governance: String(options.include_governance ?? true),
			time_range: options.time_range || '24h',
		});

		const response = await axios.get(
			`${API_BASE_URL}/contract-history/${address}?${params}`
		);

		return response.data;
	} catch (error) {
		console.error('API Error:', error);
		return handleApiError(error, 'Failed to get contract history');
	}
};

export const getAnalysisStatus = async (address: string, taskId: string) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/contract-history/${address}/status/${taskId}`
		);
		return response.data;
	} catch (error) {
		console.error('Status API Error:', error);
		return handleApiError(error, 'Failed to get analysis status');
	}
};
