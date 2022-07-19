import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Navbar = () => {
  const date = new Date();
  return (
    <Box
      borderRadius="10px"
      boxShadow="md"
      p={['10px','',"30px"]}
      mb="10px"
      borderBottom="1px solid #d8d8d8b3"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="28px" color="current">
          {' '}
          Welcome back, Draq{' '}
        </Text>
        <Stack direction="row" alignItems="center" gap="2">
          <Box w="20px" h="20px" bg="yellow"></Box>
          <Box w="20px" h="20px" bg="green"></Box>
          <Box w="20px" h="20px" bg="green"></Box>
          <Text> {date.toDateString()} </Text>
          <Avatar
            size="sm"
            name="User Name"
            src="https://bit.ly/segun-adebayo"
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
