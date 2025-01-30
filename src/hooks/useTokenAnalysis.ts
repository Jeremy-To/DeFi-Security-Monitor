import { useState, useCallback } from 'react';
import { getTokenAnalysis } from '../services/api';
import type { TokenAnalysisState } from '../types/index';
import { validateAddress } from '../utils/validation';

export const useTokenAnalysis = () => {
	const [state, setState] = useState<TokenAnalysisState>({
		isLoading: false,
		error: null,
		data: null,
	});

	const analyze = useCallback(async (address: string) => {
		const validationError = validateAddress(address);
		if (validationError) {
			setState((prev: TokenAnalysisState) => ({
				...prev,
				error: validationError,
			}));
			return;
		}

		setState((prev: TokenAnalysisState) => ({
			...prev,
			isLoading: true,
			error: null,
		}));
		try {
			const result = await getTokenAnalysis(address);
			setState({ isLoading: false, error: null, data: result });
		} catch (err) {
			setState({
				isLoading: false,
				error: err instanceof Error ? err.message : 'Failed to analyze token',
				data: null,
			});
		}
	}, []);

	return { ...state, analyze };
};
