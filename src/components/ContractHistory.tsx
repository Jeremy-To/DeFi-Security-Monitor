import { useState } from 'react';
import {
	Box,
	VStack,
	Heading,
	Button,
	Alert,
	AlertIcon,
	Spinner,
	Text,
	useBreakpointValue,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	HStack,
	Badge,
	Icon,
	Select,
	Switch,
	FormControl,
	FormLabel,
	Progress,
} from '@chakra-ui/react';
import { AddressInput } from './common/AddressInput';
import { useContractHistory } from '../hooks/useContractHistory';
import { FiClock, FiActivity, FiCode } from 'react-icons/fi';
import { formatDate } from '../utils/format';
import type { ContractHistoryResult } from '../types/index';

const ContractHistory = () => {
	const [address, setAddress] = useState('');
	const [analysisConfig, setAnalysisConfig] = useState({
		depth: 'standard' as const,
		include_holders: true,
		include_governance: true,
		time_range: '24h' as const,
	});
	const [waitForFullAnalysis, setWaitForFullAnalysis] = useState(false);
	const { isLoading, error, data, taskId, estimatedCompletion, fetchHistory } =
		useContractHistory();

	const padding = useBreakpointValue({ base: 4, md: 6 });
	const maxWidth = useBreakpointValue({ base: '100%', md: '800px' });
	const inputHeight = useBreakpointValue({ base: '50px', md: '60px' });
	const buttonHeight = useBreakpointValue({ base: '46px', md: '56px' });
	const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
	const headingSize = useBreakpointValue({ base: 'md', md: 'lg' });
	const spinnerSize = useBreakpointValue({ base: 'md', md: 'xl' });

	const handleAnalyze = () => {
		fetchHistory(address, analysisConfig, waitForFullAnalysis);
	};

	const renderAnalysisProgress = () => {
		if (!taskId || !estimatedCompletion) return null;

		return (
			<Box mb={6}>
				<Text mb={2}>Analysis in progress...</Text>
				<Progress size="sm" isIndeterminate colorScheme="blue" mb={2} />
				<Text fontSize="sm" color="whiteAlpha.700">
					Estimated completion time: {estimatedCompletion} seconds
				</Text>
			</Box>
		);
	};

	const renderConfigurationPanel = () => (
		<Box mb={6} bg="background.secondary" p={4} borderRadius="lg">
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
				<FormControl>
					<FormLabel>Analysis Depth</FormLabel>
					<Select
						value={analysisConfig.depth}
						onChange={(e) =>
							setAnalysisConfig((prev) => ({
								...prev,
								depth: e.target.value as typeof analysisConfig.depth,
							}))
						}
					>
						<option value="quick">Quick</option>
						<option value="standard">Standard</option>
						<option value="deep">Deep</option>
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Time Range</FormLabel>
					<Select
						value={analysisConfig.time_range}
						onChange={(e) =>
							setAnalysisConfig((prev) => ({
								...prev,
								time_range: e.target.value as typeof analysisConfig.time_range,
							}))
						}
					>
						<option value="1h">Last Hour</option>
						<option value="24h">Last 24 Hours</option>
						<option value="7d">Last 7 Days</option>
						<option value="30d">Last 30 Days</option>
					</Select>
				</FormControl>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
				<FormControl display="flex" alignItems="center">
					<FormLabel mb="0">Include Holder Analysis</FormLabel>
					<Switch
						isChecked={analysisConfig.include_holders}
						onChange={(e) =>
							setAnalysisConfig((prev) => ({
								...prev,
								include_holders: e.target.checked,
							}))
						}
					/>
				</FormControl>
				<FormControl display="flex" alignItems="center">
					<FormLabel mb="0">Include Governance Analysis</FormLabel>
					<Switch
						isChecked={analysisConfig.include_governance}
						onChange={(e) =>
							setAnalysisConfig((prev) => ({
								...prev,
								include_governance: e.target.checked,
							}))
						}
					/>
				</FormControl>
			</SimpleGrid>

			<FormControl display="flex" alignItems="center" mt={4}>
				<FormLabel mb="0">Wait for Full Analysis</FormLabel>
				<Switch
					isChecked={waitForFullAnalysis}
					onChange={(e) => setWaitForFullAnalysis(e.target.checked)}
				/>
			</FormControl>
		</Box>
	);

	const renderTransactions = () => {
		if (!data?.transactions?.items?.length) {
			return (
				<Text color="whiteAlpha.600" textAlign="center">
					No transactions found
				</Text>
			);
		}

		return data.transactions.items.map(
			(
				tx: ContractHistoryResult['transactions']['items'][0],
				index: number
			) => (
				<AccordionItem key={index} border="none" mb={2}>
					<AccordionButton
						bg="whiteAlpha.50"
						_hover={{ bg: 'whiteAlpha.100' }}
						borderRadius="md"
					>
						<HStack flex="1" spacing={3}>
							<Icon as={FiActivity} />
							<Text isTruncated>{tx.transaction_hash}</Text>
							<Badge colorScheme="blue">
								{tx.gas_used.toLocaleString()} gas
							</Badge>
						</HStack>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<VStack align="stretch" spacing={2}>
							<Text>
								<strong>From:</strong> {tx.from_address}
							</Text>
							<Text>
								<strong>To:</strong> {tx.to_address}
							</Text>
							<Text>
								<strong>Value:</strong> {tx.value} ETH
							</Text>
							<Text>
								<strong>Time:</strong> {formatDate(tx.timestamp)}
							</Text>
							<Text>
								<strong>Status:</strong>{' '}
								<Badge colorScheme={tx.success ? 'green' : 'red'}>
									{tx.success ? 'Success' : 'Failed'}
								</Badge>
							</Text>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			)
		);
	};

	const renderEvents = () => {
		if (!data?.events?.items?.length) {
			return (
				<Text color="whiteAlpha.600" textAlign="center">
					No events found
				</Text>
			);
		}

		return data.events.items.map(
			(event: ContractHistoryResult['events']['items'][0], index: number) => (
				<AccordionItem key={index} border="none" mb={2}>
					<AccordionButton
						bg="whiteAlpha.50"
						_hover={{ bg: 'whiteAlpha.100' }}
						borderRadius="md"
					>
						<HStack flex="1" spacing={3}>
							<Icon as={FiClock} />
							<Text>{event.event_type}</Text>
							<Badge>{formatDate(event.timestamp)}</Badge>
						</HStack>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Text as="pre" fontSize="sm" whiteSpace="pre-wrap">
							{JSON.stringify(event.details, null, 2)}
						</Text>
					</AccordionPanel>
				</AccordionItem>
			)
		);
	};

	const renderModifications = () => {
		if (!data?.modifications?.items?.length) {
			return (
				<Text color="whiteAlpha.600" textAlign="center">
					No modifications found
				</Text>
			);
		}

		return data.modifications.items.map(
			(
				mod: ContractHistoryResult['modifications']['items'][0],
				index: number
			) => (
				<AccordionItem key={index} border="none" mb={2}>
					<AccordionButton
						bg="whiteAlpha.50"
						_hover={{ bg: 'whiteAlpha.100' }}
						borderRadius="md"
					>
						<HStack flex="1" spacing={3}>
							<Icon as={FiCode} />
							<Text>{mod.modification_type}</Text>
							<Badge>{formatDate(mod.timestamp)}</Badge>
						</HStack>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<VStack align="stretch" spacing={2}>
							{mod.old_value && (
								<Text>
									<strong>Old Value:</strong> {mod.old_value}
								</Text>
							)}
							{mod.new_value && (
								<Text>
									<strong>New Value:</strong> {mod.new_value}
								</Text>
							)}
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			)
		);
	};

	return (
		<Box maxW={maxWidth} mx="auto" px={padding}>
			<Heading size={headingSize} mb={6} color="whiteAlpha.900">
				Contract History Analysis
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
				{renderConfigurationPanel()}
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
					Analyze History
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

			{isLoading && !taskId && (
				<Box textAlign="center">
					<Spinner size={spinnerSize} color="brand.primary" />
					<Text mt={2} color="whiteAlpha.700" fontSize={fontSize}>
						Analyzing contract history...
					</Text>
				</Box>
			)}

			{taskId && renderAnalysisProgress()}

			{data && (
				<VStack spacing={6} align="stretch">
					{/* Overview Stats */}
					<SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
						<Stat bg="background.secondary" p={4} borderRadius="lg">
							<StatLabel>Total Transactions</StatLabel>
							<StatNumber>{data.transactions?.total_count ?? 0}</StatNumber>
						</Stat>
						<Stat bg="background.secondary" p={4} borderRadius="lg">
							<StatLabel>Total Events</StatLabel>
							<StatNumber>{data.events?.total_count ?? 0}</StatNumber>
						</Stat>
						<Stat bg="background.secondary" p={4} borderRadius="lg">
							<StatLabel>Total Modifications</StatLabel>
							<StatNumber>{data.modifications?.total_count ?? 0}</StatNumber>
						</Stat>
					</SimpleGrid>

					{/* Transactions */}
					<Box bg="background.secondary" p={6} borderRadius="lg">
						<Heading size="md" mb={4}>
							Recent Transactions
						</Heading>
						<Accordion allowMultiple>{renderTransactions()}</Accordion>
					</Box>

					{/* Events */}
					<Box bg="background.secondary" p={6} borderRadius="lg">
						<Heading size="md" mb={4}>
							Contract Events
						</Heading>
						<Accordion allowMultiple>{renderEvents()}</Accordion>
					</Box>

					{/* Modifications */}
					<Box bg="background.secondary" p={6} borderRadius="lg">
						<Heading size="md" mb={4}>
							Contract Modifications
						</Heading>
						<Accordion allowMultiple>{renderModifications()}</Accordion>
					</Box>
				</VStack>
			)}
		</Box>
	);
};

export default ContractHistory;
