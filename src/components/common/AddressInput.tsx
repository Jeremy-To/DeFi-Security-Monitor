import { Input, InputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface AddressInputProps extends Omit<InputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        placeholder="Enter contract address (0x...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="background.secondary"
        border="none"
        color="whiteAlpha.900"
        _placeholder={{ color: 'whiteAlpha.500' }}
        {...props}
      />
    );
  }
);

AddressInput.displayName = 'AddressInput'; 