import {
  Box,
  Flex,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Category } from '../utils/types';

const Dashboard: NextPage = () => {
  const bgcolor = useColorModeValue('white', 'black');
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
    <Stack direction="row" bgColor={bgcolor} w={['100vw','',"100%"]}>
      <Box pos="fixed" w={['0','','']}>
        <Sidebar />
      </Box>
      <Box
        pos="relative"
        left={['0','',"50px"]}
        minWidth={['100%','',"calc(100vw - 60px)"]}
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

// export function getStaticProps() {}