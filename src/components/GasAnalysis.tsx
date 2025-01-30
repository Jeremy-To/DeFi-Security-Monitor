import { useState } from 'react';
import {
	Box,
	Heading,
	Button,
	Alert,
	AlertIcon,
	Spinner,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { AddressInput } from './common/AddressInput';
import { GasAnalysisResults } from './GasAnalysisResults';
import { useGasAnalysis } from '../hooks/useGasAnalysis';

const GasAnalysis = () => {
	const [address, setAddress] = useState('');
	const { isLoading, error, data, analyze } = useGasAnalysis();

	const padding = useBreakpointValue({ base: 4, md: 6 });
	const maxWidth = useBreakpointValue({ base: '100%', md: '800px' });
	const inputHeight = useBreakpointValue({ base: '50px', md: '60px' });
	const buttonHeight = useBreakpointValue({ base: '46px', md: '56px' });
	const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
	const headingSize = useBreakpointValue({ base: 'md', md: 'lg' });
	const spinnerSize = useBreakpointValue({ base: 'md', md: 'xl' });

	const handleAnalyze = () => {
		analyze(address);
	};

	return (
		<Box maxW={maxWidth} mx="auto" px={padding}>
			<Heading size={headingSize} mb={6} color="whiteAlpha.900">
				Gas Analysis
			</Heading>

			<Box mb={6}>
				<AddressInput
					value={address}
					onChange={setAddress}
					height={inputHeight}
					fontSize={fontSize}
					mb={4}
					isDisabled={isLoading}
				/>
				<Button
					onClick={handleAnalyze}
					isLoading={isLoading}
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
					Analyze Gas Usage
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

			{isLoading && (
				<Box textAlign="center">
					<Spinner size={spinnerSize} color="brand.primary" />
					<Text mt={2} color="whiteAlpha.700" fontSize={fontSize}>
						Analyzing gas usage...
					</Text>
				</Box>
			)}

			{data && <GasAnalysisResults result={data} />}
		</Box>
	);
};

export default GasAnalysis;
