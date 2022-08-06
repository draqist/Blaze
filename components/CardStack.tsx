import {
  Box,
  Button,
  Center,
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { authEmail } from '../utils/atom';
import { initialTask, Task } from '../utils/types';
import { createNewTask } from '../utils/utils';
import Taskcard from './Taskcard';

const CardStack = (props: any) => {
  const { title, task, id, rev, uid } = props;
  const textcolor = useColorModeValue('black', 'white');
  const [newTask, setTasks] = useState<Task>(initialTask);
  const [dis, setDis] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const em = useRecoilValue(authEmail)
  const [catid, setCatId] = useState(null)

  useEffect(() => {
    getcatId()
    if (id === catid) {
      setDis('flex');
    } else {
      setDis('none');
    }
    console.log(task)

    // eslint-disable-next-line
  }, []);
  // @ts-ignore
  function handleModalInputs(e) {
    let value = e.target.value;
    setTasks({ ...newTask, [e.target.name]: value });
  }
  async function getcatId() {
    try {
      const catId = await axios.post('/api/usercatid', {
        email: em,
      })
      setCatId(catId.data)
    } catch (error) {
      // @ts-ignore
      console.log(error.error)
    }
  }
  function calcId() {
    let userid;
    return userid = (1 + ((uid-1) * 4))
  }
  
  let req = {
    newTask, calcId, initialTask, onClose, setTasks,rev, em
  }
  return (
    <>
      <Stack
        flexBasis={'29%'}
        direction="column"
        color={textcolor}
        border="2px solid"
        px="12px"
        py="14px"
        borderColor="gray.500"
        borderStyle="dashed"
        borderRadius="16px"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={['8px','','10px','18px','20px']}>
          <Text mb="6px"> {title} </Text>

          <Button
            display={dis}
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
        {
          task.length === 0 ?
            <Box
              w="300px"
              h="175px"
              boxShadow=""
              border="1px solid #d8d8d8b3"
              borderRadius="10px"
            >
              <Center w='100%' h='100%'>
                There are no tasks here yet.😊
              </Center>
            </Box> :
          task?.map((data: any, id: any) => (
          <Stack key={id} direction="column" gap={'5'} py="5px">
            <Taskcard
              title={data.title}
              team={data.description}
              label={data.label}
              date={data.createdAt}
              progress={'0'}
              uid={data.id}
              pop={rev}
              k={id}
              author_id={data.authorId}
              calc= {calcId()}
            />
          </Stack>
        ))}
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={['sm', 'sm', 'xl']}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="500">Add a new task</ModalHeader>
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => createNewTask(req)
              }
            >
              Add task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardStack;
