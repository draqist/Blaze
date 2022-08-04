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
import { createEditedTask, updatecategory } from '../utils/utils';

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
  
  let colorscheme;
  if (label === 'Critical') {
    colorscheme = 'red';
  } else if (label === 'High Priority') {
    colorscheme = 'pink';
  } else {
    colorscheme = 'teal';
  }
  const wip = calc + 1;
  const review = calc + 2;
  const done = calc + 3;

  let id =  wip || review || done

  let catupdatereq = {
    uid, author_id, team, title, label, pop, e, id
  }
  let createeditreq = {
    uid, editedTasks, author_id, onClose, pop, e
  }

  return (
      <Box
        w="300px"
        h="175px"
        boxShadow="md"
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
                onClick={() => updatecategory({
                  ...catupdatereq,
                  id : wip
                })}
              >
                Move to W-I-P
              </MenuItem>
              <MenuItem
                icon={<IoMove fontSize="18px" />}
                onClick={() => updatecategory({...catupdatereq, id:review})}
              >
                Move to Review{' '}
              </MenuItem>
              <MenuItem onClick={() => updatecategory({...catupdatereq, id:done})}>
                Move to Completed
              </MenuItem>
              {/* onClick={() => deletetask(uid)} */}
              <MenuItem color="red">
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered
        size={['sm', 'sm', 'xl']}>
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
            <Button colorScheme="blue" mr={3} onClick={() => createEditedTask(createeditreq)}>
              Edit task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>

  );
};

export default Taskcard;
