import { useState, useCallback } from 'react';
import { analyzeContract } from '../services/api';
import type { AnalysisResult } from '../types';
import { validateAddress } from '../utils/validation';

interface AnalysisState {
	isLoading: boolean;
	error: string | null;
	data: AnalysisResult | null;
}

export const useContractAnalysis = () => {
	const [state, setState] = useState<AnalysisState>({
		isLoading: false,
		error: null,
		data: null,
	});

	const analyze = useCallback(async (address: string) => {
		const validationError = validateAddress(address);
		if (validationError) {
			setState((prev: AnalysisState) => ({ ...prev, error: validationError }));
			return;
		}

		setState((prev: AnalysisState) => ({
			...prev,
			isLoading: true,
			error: null,
		}));
		try {
			const result = await analyzeContract(address);
			setState({ isLoading: false, error: null, data: result });
		} catch (err) {
			setState({
				isLoading: false,
				error:
					err instanceof Error ? err.message : 'Failed to analyze contract',
				data: null,
			});
		}
	}, []);

	return { ...state, analyze };
};
