import React from 'react';
import {
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  IconButton,
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
      // mt="14px"
      onClick={toggleColorMode}
      {...props}
      fontWeight="400"
      __active={{ outline: 'none' }}
    >
      <Text mr="6px">
        <SwitchIcon />
      </Text>
      {`${text}`}
    </Button>
  );
};
