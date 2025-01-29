import axios from 'axios';
import type { AnalysisResult } from '../types';
import { config } from '../config/environment';

const { API_BASE_URL } = config;

const handleApiError = (error: unknown, defaultMessage: string) => {
	if (axios.isAxiosError(error)) {
		const message = error.response?.data?.detail || defaultMessage;
		// Log error for monitoring
		console.error(`API Error: ${message}`, error);
		throw new Error(message);
	}
	throw error;
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
