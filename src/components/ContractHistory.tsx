import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  Spinner,
  Text,
  Card,
  CardHeader,
  CardBody,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { getContractHistory } from '../services/api';

const ContractHistory = () => {
  const [address, setAddress] = useState('');
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!address) {
      setError('Please enter a contract address');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getContractHistory(address, days);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contract history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Contract History</Heading>

      <Box>
        <Input
          placeholder="Enter contract address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size="lg"
          mb={4}
        />
        <NumberInput
          value={days}
          min={1}
          max={365}
          onChange={(_, value) => setDays(value)}
          mb={4}
        >
          <NumberInputField placeholder="Number of days" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          colorScheme="blue"
          onClick={handleAnalyze}
          isLoading={loading}
          loadingText="Analyzing"
          width="full"
        >
          Get History
        </Button>
      </Box>

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {loading && (
        <Box textAlign="center">
          <Spinner size="xl" />
          <Text mt={2}>Fetching contract history...</Text>
        </Box>
      )}

      {result && (
        <Card>
          <CardHeader>
            <Heading size="md">Contract History</Heading>
          </CardHeader>
          <CardBody>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};

export default ContractHistory; 