import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Taskcard from '../components/Taskcard';
import { initialTask, Task } from '../utils/types';

const Dashboard: NextPage = () => {
  const textcolor = useColorModeValue('black', 'white');
  const bgcolor = useColorModeValue('white', 'black');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTask, setTasks] = useState<Task>(initialTask);

  // @ts-ignore
  function handleModalInputs(e) {
    let value = e.target.value;
    setTasks({ ...newTask, [e.target.name]: value });
  }
  return (
    <Stack direction="row" bgColor={bgcolor} w="100%">
      <Sidebar />
      <Box maxWidth="calc(100vw - 60px)" p={['6px', '', '20px']}>
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
                <Button
                  variant="ghost"
                  _active={{ outline: '0' }}
                  size="sm"
                  onClick={onOpen}
                >
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
                <Button variant="ghost" size="sm"></Button>
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
                <Button variant="ghost" size="sm"></Button>
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
                <Button variant="ghost" size="sm"></Button>
              </Flex>
              <Taskcard />
              <ColorModeSwitcher />
            </Stack>
          </Flex>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="500">Add a new Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Enter task title{' '}
              </FormLabel>
              <Input
                type="text"
                placeholder="Task title"
                name="title"
                value={newTask.title}
                onChange={handleModalInputs}
                variant="flushed"
              />
              <FormErrorMessage> Kindly add a task title </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Task description{' '}
              </FormLabel>
              <Textarea
                placeholder="Add a short description"
                resize="vertical"
                name="description"
                value={newTask.description}
                onChange={handleModalInputs}
              />
              <FormErrorMessage>
                {' '}
                Kindly add a short description{' '}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Label{' '}
              </FormLabel>
              <Select
                name="label"
                value={newTask.label}
                placeholder="Choose a label"
                onChange={handleModalInputs}
              >
                <option value={'Critical'}> Critical </option>
                <option value={'High Priority'}> High Priority </option>
                <option value={'Low Priority'}> Low Priority </option>
              </Select>
              <FormErrorMessage> Kindly add a label </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Add task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Dashboard;
