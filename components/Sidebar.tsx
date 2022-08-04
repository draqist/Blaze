import { Button, Circle, Stack, useColorModeValue } from '@chakra-ui/react';
import { BiBarChartSquare } from 'react-icons/bi';
import {
  IoCalendarOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import NextLink from 'next/link';
import {signOut} from 'firebase/auth';
import { auth } from '../firebase.config';

const Sidebar = () => {
  const textcolor = useColorModeValue('white', 'black');
  const bgcolor = useColorModeValue('#1A202C', 'white');
  return (
    <Stack
      direction="column"
      textAlign="center"
      h="100vh"
      w={['0', '', '60px']}
      bg={bgcolor}
      color={textcolor}
      fontSize="28px"
      spacing="40px"
      alignItems="center"
      py="20px"
      display={['none','','flex']}
    >
      <Circle p="6px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/dashboard">
          <MdOutlineSpaceDashboard fontWeight="100" />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/notes">
          <BiBarChartSquare />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/profile">
          <IoPersonOutline fontSize="20px" />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/calendar">
          <IoCalendarOutline fontSize="20px" />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/settings">
          <IoSettingsOutline />
        </NextLink>
      </Circle>
      <Button pos='fixed' bottom ={['','','80px','120px','40px']} variant='ghost' colorScheme='transparent' fontSize='28px' mt='200px' alignItems="center" onClick={() => signOut(auth)}>
        <NextLink href='/'>
          <IoLogOutOutline color='red'/>
        </NextLink>
      </Button>
    </Stack>
  );
};

export default Sidebar;
