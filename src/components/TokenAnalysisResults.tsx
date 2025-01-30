import {
	Box,
	Text,
	VStack,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Progress,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Icon,
	HStack,
	List,
	ListItem,
	ListIcon,
	Spinner,
	Center,
} from '@chakra-ui/react';
import {
	FaExclamationTriangle,
	FaCheckCircle,
	FaTimesCircle,
} from 'react-icons/fa';
import type { TokenAnalysisResult } from '../types/index';
import { formatNumber } from '../utils/format';

interface TokenAnalysisResultsProps {
	result: TokenAnalysisResult | null;
}

interface SupplyMechanics {
	[key: string]: boolean | string[];
	is_mintable: boolean;
	is_burnable: boolean;
	has_transfer_fee: boolean;
	has_max_transaction_limit: boolean;
	has_blacklist: boolean;
	has_whitelist: boolean;
	has_anti_whale: boolean;
	suspicious_features: string[];
}

const defaultBasicInfo = {
	total_supply: 0,
	decimals: 0,
	symbol: '',
	name: '',
};

const defaultSupplyMechanics: SupplyMechanics = {
	is_mintable: false,
	is_burnable: false,
	has_transfer_fee: false,
	has_max_transaction_limit: false,
	has_blacklist: false,
	has_whitelist: false,
	has_anti_whale: false,
	suspicious_features: [],
};

const defaultSecurityAnalysis = {
	vulnerabilities: [],
	security_features: [],
	ownership_analysis: {
		has_owner: false,
		can_renounce_ownership: false,
		has_multiple_admins: false,
		has_timelock: false,
	},
	risk_indicators: {
		high_risk_functions: false,
		centralized_control: false,
		unsafe_design: false,
		complexity_risk: false,
	},
};

const defaultRiskAssessment = {
	risk_score: 0,
	risk_level: 'UNKNOWN',
	risk_factors: [],
	recommendations: [],
	immediate_concerns: [],
};

export const TokenAnalysisResults = ({ result }: TokenAnalysisResultsProps) => {
	if (!result) {
		return (
			<Center h="200px">
				<Spinner size="xl" color="brand.primary" />
			</Center>
		);
	}

	const basic_info = { ...defaultBasicInfo, ...result.basic_info };
	const supply_mechanics = {
		...defaultSupplyMechanics,
		...result.supply_mechanics,
	};
	const security_analysis = {
		...defaultSecurityAnalysis,
		...result.security_analysis,
	};
	const risk_assessment = {
		...defaultRiskAssessment,
		...result.risk_assessment,
	};

	return (
		<VStack spacing={6} align="stretch" w="full">
			{/* Basic Info */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Token Information
				</Text>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
					<Stat>
						<StatLabel>Token Name</StatLabel>
						<StatNumber>{basic_info.name}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Symbol</StatLabel>
						<StatNumber>{basic_info.symbol}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Total Supply</StatLabel>
						<StatNumber>
							{formatNumber(basic_info.total_supply || 0)}
						</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Decimals</StatLabel>
						<StatNumber>{basic_info.decimals}</StatNumber>
					</Stat>
				</SimpleGrid>
			</Box>

			{/* Supply Mechanics */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Supply Mechanics
				</Text>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
					{Object.entries(supply_mechanics)
						.filter(
							(entry): entry is [string, boolean] =>
								typeof entry[1] === 'boolean'
						)
						.map(([key, value]) => (
							<HStack key={key} justify="space-between" p={2}>
								<Text>
									{key
										.split('_')
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(' ')}
								</Text>
								<Icon
									as={value ? FaCheckCircle : FaTimesCircle}
									color={value ? 'green.500' : 'red.500'}
								/>
							</HStack>
						))}
				</SimpleGrid>
				{supply_mechanics.suspicious_features?.length > 0 && (
					<Box mt={4}>
						<Text fontWeight="bold" mb={2}>
							Suspicious Features:
						</Text>
						<List spacing={2}>
							{supply_mechanics.suspicious_features.map((feature, index) => (
								<ListItem key={index} color="red.300">
									<ListIcon as={FaExclamationTriangle} color="red.300" />
									{feature}
								</ListItem>
							))}
						</List>
					</Box>
				)}
			</Box>

			{/* Risk Assessment */}
			<Box bg="background.secondary" p={6} borderRadius="lg">
				<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
					Risk Assessment
				</Text>
				<VStack spacing={4} align="stretch">
					<Box>
						<Text mb={2}>Risk Score</Text>
						<Progress
							value={risk_assessment.risk_score}
							colorScheme={
								risk_assessment.risk_score > 70
									? 'red'
									: risk_assessment.risk_score > 30
									? 'orange'
									: 'green'
							}
							borderRadius="full"
						/>
						<Text mt={1} fontSize="sm">
							{risk_assessment.risk_score}/100 - {risk_assessment.risk_level}{' '}
							Risk
						</Text>
					</Box>

					<Accordion allowMultiple>
						{risk_assessment.risk_factors?.length > 0 && (
							<AccordionItem>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										Risk Factors
									</Box>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel>
									<List spacing={2}>
										{risk_assessment.risk_factors.map((factor, index) => (
											<ListItem key={index}>
												<ListIcon
													as={FaExclamationTriangle}
													color="orange.500"
												/>
												{factor}
											</ListItem>
										))}
									</List>
								</AccordionPanel>
							</AccordionItem>
						)}

						<AccordionItem>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									Security Analysis
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel>
								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
									{Object.entries(
										security_analysis.ownership_analysis || {}
									).map(([key, value]) => (
										<HStack key={key} justify="space-between">
											<Text>
												{key
													.split('_')
													.map(
														(word) =>
															word.charAt(0).toUpperCase() + word.slice(1)
													)
													.join(' ')}
											</Text>
											<Icon
												as={value ? FaCheckCircle : FaTimesCircle}
												color={value ? 'green.500' : 'red.500'}
											/>
										</HStack>
									))}
								</SimpleGrid>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</VStack>
			</Box>

			{/* Recommendations */}
			{risk_assessment.recommendations?.length > 0 && (
				<Box bg="background.secondary" p={6} borderRadius="lg">
					<Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
						Recommendations
					</Text>
					<List spacing={2}>
						{risk_assessment.recommendations.map((recommendation, index) => (
							<ListItem key={index}>
								<ListIcon as={FaCheckCircle} color="green.500" />
								{recommendation}
							</ListItem>
						))}
					</List>
				</Box>
			)}
		</VStack>
	);
};
