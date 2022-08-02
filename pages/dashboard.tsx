import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import CardStack from '../components/CardStack';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { auth } from '../firebase.config';
import { Category } from '../utils/types';

const Dashboard: NextPage = () => {
  const bgcolor = useColorModeValue('white', '#1A202C');
  const [category, setCategory] = useState<Category[]>([]);
  const [userId, setUserId] = useState<Number>();
  

  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        // @ts-ignore
        getTasks(userCred.email);
      }
    });
  }, []);
  async function getTasks(email: string) {
    try {
      const dew = await axios({
        method: 'post',
        url: '/api/usertasks',
        data: {
          email
        }
      });
      const res = dew.data.category;
      const id = dew.data.id
      setUserId(id)
      console.log(userId)
      return setCategory(res);
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
                uid={userId}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
