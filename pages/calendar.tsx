import { Center, Stack } from '@chakra-ui/react';
import React from 'react';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';

const Calendar = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <Center h="100vh" w="100vw">
        Coming soon...
        <BottomNav />
      </Center>
    </Stack>
  );
};

export default Calendar;
