import { Component, ErrorInfo, ReactNode } from 'react';
import {
	Box,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<Box p={4}>
					<Alert status="error">
						<AlertIcon />
						<AlertTitle>Something went wrong!</AlertTitle>
						<AlertDescription>
							Please try refreshing the page or contact support if the problem
							persists.
						</AlertDescription>
					</Alert>
				</Box>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
