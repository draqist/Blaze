import {
  Box,
  Button,
  Circle,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { FaPlus } from 'react-icons/fa';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Taskcard from '../components/Taskcard';

const Dashboard: NextPage = () => {
  const textcolor = useColorModeValue('black', 'white');
  const bgcolor = useColorModeValue('white', 'black');
  return (
    <Stack direction="row" bgColor={bgcolor} w="100%">
      <Sidebar />
      <Box maxWidth="calc(100vw - 60px)" p={['6px','',"20px"]}>
        <Navbar />
        <Box>
          <Flex
            wrap="nowrap"
            overflowX="scroll"
            justifyContent="space-between"
            alignItems="flex-start"
            gap="5"
            py="20px"
          >
            <Stack
              direction="column"
              color={textcolor}
              border="2px solid"
              px="12px"
              py="14px"
              borderColor="gray.500"
              borderStyle="dashed"
              borderRadius="16px"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="10px"
              >
                <Text mb="6px"> To-Do </Text>
                <Button variant="ghost" _active={{ outline: '0' }} size="sm">
                  <Circle border="1px solid #d8d8d8" size="20px">
                    <FaPlus fontSize="10px" />
                  </Circle>
                  <Text ml="6px" fontWeight="400">
                    {' '}
                    Add new task{' '}
                  </Text>
                </Button>
              </Flex>
              <Taskcard />
              <ColorModeSwitcher />
            </Stack>
            <Stack
              direction="column"
              color={textcolor}
              border="2px solid"
              px="12px"
              py="14px"
              borderColor="gray.500"
              borderStyle="dashed"
              borderRadius="16px"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="10px"
              >
                <Text mb="6px"> Work-in-progress </Text>
                <Button variant="ghost" size="sm">
                  <Circle border="1px solid #d8d8d8" size="20px">
                    <FaPlus fontSize="10px" />
                  </Circle>
                  <Text ml="6px" fontWeight="400">
                    {' '}
                    Add new task{' '}
                  </Text>
                </Button>
              </Flex>
              <Taskcard />
              <ColorModeSwitcher />
            </Stack>
            <Stack
              direction="column"
              color={textcolor}
              border="2px solid"
              px="12px"
              py="14px"
              borderColor="gray.500"
              borderStyle="dashed"
              borderRadius="16px"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="10px"
              >
                <Text mb="6px"> Review </Text>
                <Button variant="ghost" size="sm">
                  <Circle border="1px solid #d8d8d8" size="20px">
                    <FaPlus fontSize="10px" />
                  </Circle>
                  <Text ml="6px" fontWeight="400">
                    {' '}
                    Add new task{' '}
                  </Text>
                </Button>
              </Flex>
              <Taskcard />
              <ColorModeSwitcher />
            </Stack>
            <Stack
              direction="column"
              color={textcolor}
              border="2px solid"
              px="12px"
              py="14px"
              borderColor="gray.500"
              borderStyle="dashed"
              borderRadius="16px"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="10px"
              >
                <Text mb="6px"> Completed </Text>
                <Button variant="ghost" size="sm">
                  <Circle border="1px solid #d8d8d8" size="20px">
                    <FaPlus fontSize="10px" />
                  </Circle>
                  <Text ml="6px" fontWeight="400">
                    {' '}
                    Add new task{' '}
                  </Text>
                </Button>
              </Flex>
              <Taskcard />
              <ColorModeSwitcher />
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
