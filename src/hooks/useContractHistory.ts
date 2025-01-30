import { useState, useCallback, useEffect } from 'react';
import { getContractHistory, getAnalysisStatus } from '../services/api';
import type { ContractHistoryResult } from '../types/index';
import { validateAddress } from '../utils/validation';

interface AnalysisConfig {
	depth: 'quick' | 'standard' | 'deep';
	include_holders: boolean;
	include_governance: boolean;
	time_range: '1h' | '24h' | '7d' | '30d';
}

interface ContractHistoryState {
	isLoading: boolean;
	error: string | null;
	data: ContractHistoryResult | null;
	taskId?: string;
	estimatedCompletion?: number;
}

export const useContractHistory = () => {
	const [state, setState] = useState<ContractHistoryState>({
		isLoading: false,
		error: null,
		data: null,
	});

	const fetchHistory = useCallback(
		async (
			address: string,
			config: AnalysisConfig = {
				depth: 'standard',
				include_holders: true,
				include_governance: true,
				time_range: '24h',
			},
			waitForFullAnalysis: boolean = false
		) => {
			const validationError = validateAddress(address);
			if (validationError) {
				setState((prev) => ({ ...prev, error: validationError }));
				return;
			}

			setState((prev) => ({ ...prev, isLoading: true, error: null }));
			let pollInterval: ReturnType<typeof setInterval> | null = null;

			try {
				const result = await getContractHistory(address, {
					full_analysis: waitForFullAnalysis,
					...config,
				});

				if (!result) {
					throw new Error('No response from server');
				}

				if (result.contract_address) {
					setState({
						isLoading: false,
						error: null,
						data: result,
						taskId: undefined,
						estimatedCompletion: undefined,
					});
					return;
				}

				if (result.status === 'analysis_pending' && result.task_id) {
					setState({
						isLoading: true,
						error: null,
						data: result.quick_overview || null,
						taskId: result.task_id,
						estimatedCompletion: result.estimated_completion_time,
					});

					if (waitForFullAnalysis) {
						let attempts = 0;
						const maxAttempts = 30;

						pollInterval = setInterval(async () => {
							try {
								attempts++;
								if (attempts >= maxAttempts) {
									if (pollInterval) clearInterval(pollInterval);
									setState((prev) => ({
										...prev,
										isLoading: false,
										error: 'Analysis timed out. Please try again.',
										taskId: undefined,
										estimatedCompletion: undefined,
									}));
									return;
								}

								const status = await getAnalysisStatus(address, result.task_id);

								if (status.status === 'completed') {
									if (pollInterval) clearInterval(pollInterval);
									setState({
										isLoading: false,
										error: null,
										data: status.result,
										taskId: undefined,
										estimatedCompletion: undefined,
									});
								} else if (status.status === 'failed') {
									if (pollInterval) clearInterval(pollInterval);
									setState((prev) => ({
										...prev,
										isLoading: false,
										error: status.error || 'Analysis failed',
										taskId: undefined,
										estimatedCompletion: undefined,
									}));
								}
							} catch (err) {
								console.error('Polling error:', err);
								if (pollInterval) clearInterval(pollInterval);
								setState((prev) => ({
									...prev,
									isLoading: false,
									error:
										err instanceof Error
											? err.message
											: 'Failed to check analysis status',
									taskId: undefined,
									estimatedCompletion: undefined,
								}));
							}
						}, 2000);
					}
				} else {
					throw new Error('Unexpected response format from server');
				}
			} catch (err) {
				console.error('Contract history error:', err);
				if (pollInterval) {
					clearInterval(pollInterval);
				}
				setState({
					isLoading: false,
					error:
						err instanceof Error
							? err.message
							: 'Failed to fetch contract history',
					data: null,
					taskId: undefined,
					estimatedCompletion: undefined,
				});
			}
		},
		[]
	);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			setState((prev) => ({
				...prev,
				taskId: undefined,
				estimatedCompletion: undefined,
			}));
		};
	}, []);

	return { ...state, fetchHistory };
};
