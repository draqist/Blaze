import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Select,
  Tag,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMove } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { authEmail } from '../utils/atom';
import { taskcard } from '../utils/types';

const Taskcard = ({
  title,
  team,
  progress,
  date,
  label,
  uid,
  pop,
  author_id,
  calc
}: taskcard) => {
  const d = new Date(date).toDateString();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const e = useRecoilValue(authEmail)
  const [editedTasks, setEditedTask] = useState({
    title: title,
    description: team,
    progress: progress,
    date: date,
    label: label,
  });
  // @ts-ignore
  function handleEditModalInputs(e) {
    const value = e.target.value;
    setEditedTask({ ...editedTasks, [e.target.name]: value });
  }
  async function createEditedTask() {
    try {
      const edittask = await fetch(`/api/tasks/${uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedTasks,
          authorId: author_id,
          uid
        }),
      });
      onClose();
      return edittask;
    } catch (error) {
      return error;
    } finally {
      pop();
    }
  }
  let colorscheme;
  if (label === 'Critical') {
    colorscheme = 'red';
  } else if (label === 'High Priority') {
    colorscheme = 'pink';
  } else {
    colorscheme = 'teal';
  }
  async function updatecategory(id: number) {
    try {
      const updated = await fetch(`/api/tasks/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          description: team,
          label: label,
          authorId: author_id,
          categoryId: id,
          uid: uid,
        }),
      });
      return updated;
    } catch (error) {
      console.log(error);
    } finally {
      pop(e);
    }
  }
  async function deletetask(id: number) {
    try {
      await fetch('api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
        }),
      });
      pop();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Box
        w="300px"
        h="175px"
        boxShadow="lg"
        border="1px solid #d8d8d8b3"
        borderRadius="10px"
        p="10px"
      >
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Text fontSize="20px"> {title} </Text>
            <Text fontSize="12px"> {team}</Text>
          </Box>
          <Menu>
            <MenuButton
              borderRadius="50%"
              textAlign="center"
              size="sm"
              w="30px"
              h="30px"
              as={Button}
              outline="none"
              variant="unstyled"
            >
              <Circle
                border="1px solid #d3d3d4"
                size="26px"
                _hover={{ bgColor: '#E2E8F0' }}
              >
                <FaEllipsisH fontSize="16px" />
              </Circle>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<MdOutlineEdit fontSize="18px" />}
                onClick={onOpen}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<IoMove fontSize="18px" />}
                onClick={() => updatecategory(calc + 1)}
              >
                Move to W-I-P
              </MenuItem>
              <MenuItem
                icon={<IoMove fontSize="18px" />}
                onClick={() => updatecategory(calc + 2)}
              >
                Move to Review{' '}
              </MenuItem>
              <MenuItem onClick={() => updatecategory(calc + 3)}>
                Move to Completed
              </MenuItem>
              <MenuItem color="red" onClick={() => deletetask(uid)}>
                {' '}
                Delete{' '}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box mt="18px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="14px"> Progress </Text>
            <Text fontSize="12px"> {progress}</Text>
          </Flex>
          <Progress
            isAnimated
            h="6px"
            borderRadius="10px "
            mt="6px"
            color="green"
            value={10}
          />
        </Box>
        <Box mt="18px">
          <Flex justifyContent="space-between" alignItems="center">
            <Tag> {d} </Tag>
            <Tag colorScheme={colorscheme}> {label} </Tag>
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
                value={editedTasks.title}
                onChange={handleEditModalInputs}
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
                value={editedTasks.description}
                onChange={handleEditModalInputs}
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
                value={editedTasks.label}
                placeholder="Choose a label"
                onChange={handleEditModalInputs}
              >
                <option value={'Critical'}> Critical </option>
                <option value={'High Priority'}> High Priority </option>
                <option value={'Low Priority'}> Low Priority </option>
              </Select>
              <FormErrorMessage> Kindly add a label </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createEditedTask}>
              Edit task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Taskcard;
