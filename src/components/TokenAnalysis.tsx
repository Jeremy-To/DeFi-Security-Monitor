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
import { getTokenAnalysis } from '../services/api';

const TokenAnalysis = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!address) {
      setError('Please enter a token address');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getTokenAnalysis(address);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Token Analysis</Heading>

      <Box>
        <Input
          placeholder="Enter token address (0x...)"
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
          Analyze Token
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
          <Text mt={2}>Analyzing token...</Text>
        </Box>
      )}

      {result && (
        <Card>
          <CardHeader>
            <Heading size="md">Token Analysis Results</Heading>
          </CardHeader>
          <CardBody>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};

export default TokenAnalysis; 