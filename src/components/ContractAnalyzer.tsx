import { useState } from 'react';
import {
	Box,
	Button,
	Input,
	Heading,
	Text,
	Alert,
	AlertIcon,
	Spinner,
	useBreakpointValue,
} from '@chakra-ui/react';
import { analyzeContract } from '../services/api';
import type { AnalysisResult } from '../types';

const ContractAnalyzer = () => {
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [result, setResult] = useState<AnalysisResult | null>(null);

	const padding = useBreakpointValue({ base: 4, md: 6 });
	const maxWidth = useBreakpointValue({ base: '100%', md: '800px' });
	const inputHeight = useBreakpointValue({ base: '50px', md: '60px' });
	const buttonHeight = useBreakpointValue({ base: '46px', md: '56px' });
	const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
	const headingSize = useBreakpointValue({ base: 'md', md: 'lg' });

	const handleAnalyze = async () => {
		if (!address) {
			setError('Please enter a contract address');
			return;
		}

		setLoading(true);
		setError('');
		try {
			const data = await analyzeContract(address);
			setResult(data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to analyze contract'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box maxW={maxWidth} mx="auto" px={padding}>
			<Heading size={headingSize} mb={6} color="whiteAlpha.900">
				Smart Contract Security Analysis
			</Heading>

			<Box mb={6}>
				<Input
					placeholder="Enter contract address (0x...)"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					size={fontSize}
					bg="background.secondary"
					border="none"
					color="whiteAlpha.900"
					_placeholder={{ color: 'whiteAlpha.500' }}
					mb={4}
					height={inputHeight}
					fontSize={fontSize}
				/>
				<Button
					onClick={handleAnalyze}
					isLoading={loading}
					loadingText="Analyzing"
					width="full"
					bg="brand.primary"
					color="white"
					height={buttonHeight}
					fontSize={fontSize}
					_hover={{
						bg: 'brand.primary',
						opacity: 0.9,
					}}
				>
					Analyze Contract
				</Button>
			</Box>

			{error && (
				<Alert
					status="error"
					bg="background.secondary"
					color="red.300"
					fontSize={fontSize}
					borderRadius="md"
				>
					<AlertIcon />
					{error}
				</Alert>
			)}

			{loading && (
				<Box textAlign="center">
					<Spinner
						size={useBreakpointValue({ base: 'md', md: 'xl' })}
						color="brand.primary"
					/>
					<Text mt={2} color="whiteAlpha.700" fontSize={fontSize}>
						Analyzing contract...
					</Text>
				</Box>
			)}

			{result && <Box>{/* We can add the results display later */}</Box>}
		</Box>
	);
};

export default ContractAnalyzer;
