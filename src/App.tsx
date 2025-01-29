import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContractAnalyzer from './components/ContractAnalyzer';
import TokenAnalysis from './components/TokenAnalysis';
import GasAnalysis from './components/GasAnalysis';
import ContractHistory from './components/ContractHistory';
import theme from './theme';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<ErrorBoundary>
				<Router>
					<Box minH="100vh" minW="100vw" bg="background.primary">
						<Navbar />
						<Box mx="auto" p={6}>
							<Routes>
								<Route path="/" element={<ContractAnalyzer />} />
								<Route path="/token-analysis" element={<TokenAnalysis />} />
								<Route path="/gas-analysis" element={<GasAnalysis />} />
								<Route path="/contract-history" element={<ContractHistory />} />
							</Routes>
						</Box>
					</Box>
				</Router>
			</ErrorBoundary>
		</ChakraProvider>
	);
}

export default App;
