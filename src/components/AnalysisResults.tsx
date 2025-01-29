import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import type { AnalysisResult, Vulnerability } from '../types';

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

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  return (
    <VStack spacing={6} align="stretch" w="full">
      {/* Risk Score */}
      <Box bg="background.secondary" p={6} borderRadius="lg">
        <VStack spacing={3}>
          <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
            Risk Score
          </Text>
          <HStack w="full" spacing={4}>
            <Progress
              value={result.risk_score}
              colorScheme={result.risk_score > 66 ? 'red' : result.risk_score > 33 ? 'orange' : 'green'}
              w="full"
              borderRadius="full"
              size="lg"
            />
            <Text fontSize="xl" fontWeight="bold" color="whiteAlpha.900">
              {result.risk_score}
            </Text>
          </HStack>
        </VStack>
      </Box>

      {/* Quick Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Stat bg="background.secondary" p={4} borderRadius="lg">
          <StatLabel>Code Size</StatLabel>
          <StatNumber>{result.code_size} bytes</StatNumber>
        </Stat>
        <Stat bg="background.secondary" p={4} borderRadius="lg">
          <StatLabel>Vulnerabilities Found</StatLabel>
          <StatNumber>{result.vulnerabilities.length}</StatNumber>
        </Stat>
        <Stat bg="background.secondary" p={4} borderRadius="lg">
          <StatLabel>Last Updated</StatLabel>
          <StatNumber>
            {new Date(result.timestamp * 1000).toLocaleDateString()}
          </StatNumber>
        </Stat>
      </SimpleGrid>

      {/* Vulnerabilities */}
      <Box bg="background.secondary" p={6} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
          Detected Vulnerabilities
        </Text>
        <Accordion allowMultiple>
          {result.vulnerabilities.map((vuln: Vulnerability, index: number) => (
            <AccordionItem key={index} border="none" mb={2}>
              <AccordionButton
                bg="whiteAlpha.50"
                _hover={{ bg: 'whiteAlpha.100' }}
                borderRadius="md"
              >
                <HStack flex="1" spacing={3}>
                  <Icon
                    as={FaExclamationTriangle}
                    color={`${getSeverityColor(vuln.severity)}.500`}
                  />
                  <Text fontWeight="medium">{vuln.type.replace(/_/g, ' ')}</Text>
                  <Badge colorScheme={getSeverityColor(vuln.severity)}>
                    {vuln.severity}
                  </Badge>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={2}>
                  <Text color="whiteAlpha.800">{vuln.description}</Text>
                  {vuln.evidence && (
                    <Text color="whiteAlpha.600" fontSize="sm">
                      Evidence: {vuln.evidence}
                    </Text>
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>

      {/* Transaction Summary */}
      <Box bg="background.secondary" p={6} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
          Transaction Summary
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {Object.entries(result.transaction_summary).map(([key, value]) => (
            <HStack key={key} justify="space-between" p={2}>
              <Text color="whiteAlpha.700">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Text>
              <Text color="whiteAlpha.900">{value}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </Box>

      {/* Holder Statistics */}
      {Object.keys(result.holder_stats).length > 0 && (
        <Box bg="background.secondary" p={6} borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold" mb={4} color="whiteAlpha.900">
            Holder Statistics
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {Object.entries(result.holder_stats).map(([key, value]) => (
              <HStack key={key} justify="space-between" p={2}>
                <Text color="whiteAlpha.700">
                  {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Text>
                <Text color="whiteAlpha.900">{value}</Text>
              </HStack>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
};

export default AnalysisResults; 