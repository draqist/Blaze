import {
  Button,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props: any) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('Dark', 'Light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      size="sm"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="solid"
      color="current"
      // p="14px"
      borderRadius="50%"
      w="40px"
      h="40px"
      onClick={toggleColorMode}
      {...props}
      fontWeight="400"
      __active={{ outline: 'none' }}
    >
      <SwitchIcon />
    </Button>
  );
};
