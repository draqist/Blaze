import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Category, initialTask, Task } from '../utils/types';

const Dashboard: NextPage = () => {
  const bgcolor = useColorModeValue('white', 'black');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    getTasks();
  }, []);
  async function getTasks() {
    try {
      const dew = await axios.get('/api/tasks');
      console.log(dew.data);
      setCategory(dew.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack direction="row" bgColor={bgcolor} w="100%">
      <Box pos="fixed">
        <Sidebar />
      </Box>
      <Box
        pos="relative"
        left="50px"
        minWidth="calc(100vw - 60px)"
        p={['6px', '', '20px']}
      >
        <Navbar />
        <Box>
          <Flex
            wrap="nowrap"
            overflowY="scroll"
            overflowX="scroll"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={['2', '', '5']}
            py="20px"
            w={['calc(100vw - 10px)', '', 'calc(100vw - 100px)']}
          >
            {category?.map((data) => (
              <CardStack
                key={data.id}
                title={data.title}
                task={data.tasks}
                id={data.id}
                rev={getTasks}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
