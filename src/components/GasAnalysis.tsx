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
} from '@chakra-ui/react';
import { getGasAnalysis } from '../services/api';

const GasAnalysis = () => {
  const [address, setAddress] = useState('');
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
      const data = await getGasAnalysis(address);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze gas usage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Gas Analysis</Heading>

      <Box>
        <Input
          placeholder="Enter contract address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size="lg"
          mb={4}
        />
        <Button
          colorScheme="blue"
          onClick={handleAnalyze}
          isLoading={loading}
          loadingText="Analyzing"
          width="full"
        >
          Analyze Gas Usage
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
          <Text mt={2}>Analyzing gas usage...</Text>
        </Box>
      )}

      {result && (
        <Card>
          <CardHeader>
            <Heading size="md">Gas Analysis Results</Heading>
          </CardHeader>
          <CardBody>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};

export default GasAnalysis; 