import {
	Box,
	Text,
	VStack,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	List,
	ListItem,
	ListIcon,
	Progress,
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import type { GasAnalysisResult } from '../types/index';
import { formatNumber } from '../utils/format';

interface GasAnalysisResultsProps {
	result: GasAnalysisResult;
}

export const GasAnalysisResults = ({ result }: GasAnalysisResultsProps) => {
	const {
		average_gas_used = 0,
		highest_gas_operation = '',
		optimization_suggestions = [],
		estimated_savings = 0,
		historical_gas_trends = [],
	} = result;

	// Calculate efficiency score (0-100)
	const efficiencyScore = Math.max(0, 100 - average_gas_used / 100000);

	return (
		<VStack spacing={6} align="stretch" w="full">
			{/* Overview */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Gas Usage Overview
				</Text>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
					<Stat>
						<StatLabel>Average Gas Used</StatLabel>
						<StatNumber>{formatNumber(average_gas_used)}</StatNumber>
					</Stat>
					<Box>
						<Text mb={2}>Efficiency Score</Text>
						<Progress
							value={efficiencyScore}
							colorScheme={
								efficiencyScore > 80
									? 'green'
									: efficiencyScore > 50
									? 'orange'
									: 'red'
							}
							borderRadius="full"
						/>
						<Text fontSize="sm" mt={1}>
							{efficiencyScore.toFixed(1)}%
						</Text>
					</Box>
				</SimpleGrid>
			</Box>

			{/* Optimization Suggestions */}
			{optimization_suggestions.length > 0 && (
				<Box bg="background.secondary" p={6} borderRadius="lg">
					<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
						Optimization Suggestions
					</Text>
					<List spacing={3}>
						{optimization_suggestions.map(
							(suggestion: string, index: number) => (
								<ListItem
									key={index}
									display="flex"
									alignItems="center"
									color="whiteAlpha.800"
								>
									<ListIcon
										as={FiAlertTriangle}
										color="orange.500"
										boxSize={5}
										mr={3}
									/>
									{suggestion}
								</ListItem>
							)
						)}
					</List>
					{estimated_savings > 0 && (
						<Box mt={4} p={4} bg="whiteAlpha.50" borderRadius="md">
							<Text color="green.300" fontWeight="bold">
								Potential Gas Savings:{' '}
								<Text as="span" fontSize="lg">
									{formatNumber(estimated_savings)} gas units
								</Text>
							</Text>
						</Box>
					)}
				</Box>
			)}

			{/* Historical Trends */}
			{historical_gas_trends.length > 0 && (
				<Box bg="background.secondary" p={6} borderRadius="lg">
					<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
						Gas Usage Trends
					</Text>
					<Box h="300px">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={historical_gas_trends}>
								<XAxis
									dataKey="date"
									stroke="#718096"
									tick={{ fill: '#718096' }}
								/>
								<YAxis stroke="#718096" tick={{ fill: '#718096' }} />
								<Tooltip
									contentStyle={{
										backgroundColor: '#2D3748',
										border: 'none',
										borderRadius: '8px',
										color: '#CBD5E0',
									}}
								/>
								<Line
									type="monotone"
									dataKey="average_gas"
									stroke="#3182CE"
									strokeWidth={2}
									dot={false}
								/>
							</LineChart>
						</ResponsiveContainer>
					</Box>
				</Box>
			)}

			{/* Highest Gas Operations */}
			{highest_gas_operation && (
				<Box bg="background.secondary" p={6} borderRadius="lg">
					<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
						High Gas Usage Operations
					</Text>
					<Text color="whiteAlpha.800">
						Operation with highest gas consumption:
					</Text>
					<Text
						mt={2}
						p={3}
						bg="whiteAlpha.50"
						borderRadius="md"
						fontFamily="mono"
						fontSize="sm"
					>
						{highest_gas_operation}
					</Text>
				</Box>
			)}
		</VStack>
	);
};
