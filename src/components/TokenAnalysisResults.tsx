import {
	Box,
	Text,
	VStack,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Progress,
	Badge,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Icon,
	HStack,
} from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import type { TokenAnalysisResult } from '../types/index';
import { formatNumber } from '../utils/format';

interface TokenAnalysisResultsProps {
	result: TokenAnalysisResult;
}

const getSeverityColor = (severity: string) => {
	switch (severity.toUpperCase()) {
		case 'HIGH':
			return 'red';
		case 'MEDIUM':
			return 'orange';
		case 'LOW':
			return 'yellow';
		default:
			return 'gray';
	}
};

export const TokenAnalysisResults = ({ result }: TokenAnalysisResultsProps) => {
	const {
		token_type = 'Unknown',
		total_supply = 0,
		circulating_supply = 0,
		holder_metrics = {
			total_holders: 0,
			top_holder_concentration: 0,
			distribution_gini: 0,
		},
		trading_metrics = {
			volume_24h: 0,
			liquidity: 0,
			price_impact: 0,
		},
		risk_indicators = [],
	} = result || {};

	const getPercentageDisplay = (value: number | undefined | null) => {
		if (value === undefined || value === null) return 'N/A';
		return `${(value * 100).toFixed(2)}%`;
	};

	const getGiniDisplay = (value: number | undefined | null) => {
		if (value === undefined || value === null) return 'N/A';
		return value.toFixed(3);
	};

	return (
		<VStack spacing={6} align="stretch" w="full">
			{/* Token Info */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Token Information
				</Text>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
					<Stat>
						<StatLabel>Token Type</StatLabel>
						<StatNumber>{token_type}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Total Supply</StatLabel>
						<StatNumber>{formatNumber(total_supply)}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Circulating Supply</StatLabel>
						<StatNumber>{formatNumber(circulating_supply)}</StatNumber>
					</Stat>
				</SimpleGrid>
			</Box>

			{/* Holder Metrics */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Holder Distribution
				</Text>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
					<Stat>
						<StatLabel>Total Holders</StatLabel>
						<StatNumber>
							{formatNumber(holder_metrics?.total_holders)}
						</StatNumber>
					</Stat>
					<Box>
						<Text mb={2}>Top Holder Concentration</Text>
						<Progress
							value={(holder_metrics?.top_holder_concentration || 0) * 100}
							colorScheme={
								(holder_metrics?.top_holder_concentration || 0) > 0.5
									? 'red'
									: (holder_metrics?.top_holder_concentration || 0) > 0.3
									? 'orange'
									: 'green'
							}
							borderRadius="full"
						/>
						<Text fontSize="sm" mt={1}>
							{getPercentageDisplay(holder_metrics?.top_holder_concentration)}
						</Text>
					</Box>
					<Stat>
						<StatLabel>Distribution Score (Gini)</StatLabel>
						<StatNumber>
							{getGiniDisplay(holder_metrics?.distribution_gini)}
						</StatNumber>
					</Stat>
				</SimpleGrid>
			</Box>

			{/* Trading Metrics */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Trading Analysis
				</Text>
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
					<Stat>
						<StatLabel>24h Volume</StatLabel>
						<StatNumber>
							${formatNumber(trading_metrics?.volume_24h)}
						</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Liquidity</StatLabel>
						<StatNumber>${formatNumber(trading_metrics?.liquidity)}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Price Impact (10k USD)</StatLabel>
						<StatNumber>
							{getPercentageDisplay(trading_metrics?.price_impact)}
						</StatNumber>
					</Stat>
				</SimpleGrid>
			</Box>

			{/* Risk Indicators */}
			{risk_indicators.length > 0 && (
				<Box bg="background.secondary" p={6} borderRadius="lg">
					<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
						Risk Analysis
					</Text>
					<Accordion allowMultiple>
						{risk_indicators.map(
							(
								risk: TokenAnalysisResult['risk_indicators'][0],
								index: number
							) => (
								<AccordionItem key={index} border="none" mb={2}>
									<AccordionButton
										bg="whiteAlpha.50"
										_hover={{ bg: 'whiteAlpha.100' }}
										borderRadius="md"
									>
										<HStack flex="1" spacing={3}>
											<Icon
												as={FaExclamationTriangle}
												color={`${getSeverityColor(risk.severity)}.500`}
											/>
											<Text fontWeight="medium">
												{risk.type.replace(/_/g, ' ')}
											</Text>
											<Badge colorScheme={getSeverityColor(risk.severity)}>
												{risk.severity}
											</Badge>
										</HStack>
										<AccordionIcon />
									</AccordionButton>
									<AccordionPanel pb={4}>
										<Text color="whiteAlpha.800">{risk.description}</Text>
									</AccordionPanel>
								</AccordionItem>
							)
						)}
					</Accordion>
				</Box>
			)}
		</VStack>
	);
};
