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
	days: number = 30
) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/contract-history/${address}?days=${days}`
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.detail || 'Failed to get contract history'
			);
		}
		throw error;
	}
};
