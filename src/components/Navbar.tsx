import { Box,
	Flex,
	Link,
	Text,
	HStack,
	Icon,
	IconButton,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	VStack,
	useDisclosure,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
	FiShield,
	FiActivity,
	FiBarChart2,
	FiClock,
	FiMenu,
} from 'react-icons/fi';

const NavLinks = [
	{ icon: FiShield, text: 'Contract Analyzer', path: '/' },
	{ icon: FiActivity, text: 'Token Analysis', path: '/token-analysis' },
	{ icon: FiBarChart2, text: 'Gas Analysis', path: '/gas-analysis' },
	{ icon: FiClock, text: 'History', path: '/contract-history' },
];

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Box
			bg="background.secondary"
			borderBottom="1px"
			borderColor="whiteAlpha.100"
		>
			<Flex h="56px" alignItems="center" px={4} maxW="1400px" mx="auto">
				<Text
					fontSize="lg"
					fontWeight="bold"
					bgGradient="linear(to-r, brand.primary, brand.accent)"
					bgClip="text"
					mr={8}
				>
					DeFi Security Monitor
				</Text>

				{isMobile ? (
					<>
						<IconButton
							icon={<FiMenu />}
							variant="ghost"
							onClick={onOpen}
							aria-label="Open menu"
							ml="auto"
							color="whiteAlpha.900"
						/>
						<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
							<DrawerOverlay />
							<DrawerContent bg="background.secondary">
								<DrawerCloseButton color="whiteAlpha.900" />
								<DrawerHeader
									bgGradient="linear(to-r, brand.primary, brand.accent)"
									bgClip="text"
								>
									Menu
								</DrawerHeader>
								<DrawerBody>
									<VStack spacing={4} align="stretch" mt={4}>
										{NavLinks.map((link) => (
											<Link
												key={link.path}
												as={RouterLink}
												to={link.path}
												onClick={onClose}
												_hover={{ color: 'brand.primary' }}
												display="flex"
												alignItems="center"
												gap={2}
												p={2}
											>
												<Icon as={link.icon} />
												<Text>{link.text}</Text>
											</Link>
										))}
									</VStack>
								</DrawerBody>
							</DrawerContent>
						</Drawer>
					</>
				) : (
					<HStack spacing={6} ml={4}>
						{NavLinks.map((link) => (
							<Link
								key={link.path}
								as={RouterLink}
								to={link.path}
								_hover={{ color: 'brand.primary' }}
								display="flex"
								alignItems="center"
								gap={2}
							>
								<Icon as={link.icon} />
								<Text fontSize="sm">{link.text}</Text>
							</Link>
						))}
					</HStack>
				)}
			</Flex>
		</Box>
	);
};

export default Navbar;
