import { Circle, Stack, useColorModeValue } from '@chakra-ui/react';
import { BiBarChartSquare } from 'react-icons/bi';
import {
  IoCalendarOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import NextLink from 'next/link';

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
    >
      <Circle p="6px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/dashboard">
          <MdOutlineSpaceDashboard fontWeight="100" />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href="/profile">
          <IoPersonOutline fontSize="20px" />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <IoCalendarOutline fontSize="20px" />
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <NextLink href='/notes'>
          <BiBarChartSquare />
        </NextLink>
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <IoSettingsOutline />
      </Circle>
    </Stack>
  );
};

export default Sidebar;
