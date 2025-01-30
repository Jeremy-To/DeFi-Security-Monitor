import { useState, useCallback } from 'react';
import { getGasAnalysis } from '../services/api';
import type { GasAnalysisState } from '../types/index';
import { validateAddress } from '../utils/validation';

export const useGasAnalysis = () => {
	const [state, setState] = useState<GasAnalysisState>({
		isLoading: false,
		error: null,
		data: null,
	});

	const analyze = useCallback(async (address: string) => {
		const validationError = validateAddress(address);
		if (validationError) {
			setState((prev) => ({ ...prev, error: validationError }));
			return;
		}

		setState((prev) => ({ ...prev, isLoading: true, error: null }));
		try {
			const result = await getGasAnalysis(address);
			setState({ isLoading: false, error: null, data: result });
		} catch (err) {
			setState({
				isLoading: false,
				error:
					err instanceof Error ? err.message : 'Failed to analyze gas usage',
				data: null,
			});
		}
	}, []);

	return { ...state, analyze };
};
