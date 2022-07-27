import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import CardStack from '../components/CardStack';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Category } from '../utils/types';

const Dashboard: NextPage = () => {
  const bgcolor = useColorModeValue('white', '#1A202C');
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
    <Stack
      direction={['column', 'column', 'row']}
      bgColor={bgcolor}
      w={['100vw', '', '100%']}
      minH="100vh"
    >
      <Box pos="fixed" display={['none', 'none', 'block']} w={['0', '', '']}>
        <Sidebar />
      </Box>
      <BottomNav/>
      <Box
        pos="relative"
        left={['0', '', '50px']}
        minWidth={['100%', '', 'calc(100vw - 60px)']}
        p={['', '', '20px']}
        h="100%"
      >
        <Box px={['10px']}>
          <Navbar />
        </Box>
        <Box>
          <Flex
            wrap="nowrap"
            overflowY="scroll"
            overflowX="scroll"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={['2', '', '5']}
            px={['10px', '', '']}
            py={['30px', '', '20px']}
            pb={['60px', '', '20px']}
            w={['100vw', '', 'calc(100vw - 100px)']}
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
