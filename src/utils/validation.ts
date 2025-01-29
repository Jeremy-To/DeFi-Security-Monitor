export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateAddress = (address: string): string | null => {
  if (!address) {
    return 'Please enter an address';
  }
  if (!isValidEthereumAddress(address)) {
    return 'Please enter a valid Ethereum address';
  }
  return null;
}; 