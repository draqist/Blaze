import { Circle, Stack, useColorModeValue } from '@chakra-ui/react';
import { BiBarChartSquare } from 'react-icons/bi';
import {
  IoCalendarOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

const Sidebar = () => {
  const textcolor = useColorModeValue('white', 'black');
  const bgcolor = useColorModeValue('black', 'white');
  return (
    <Stack
      direction="column"
      textAlign="center"
      h="100vh"
      w="60px"
      bg={bgcolor}
      color={textcolor}
      fontSize="28px"
      spacing="40px"
      alignItems="center"
      py="20px"
    >
      <Circle p="6px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <MdOutlineSpaceDashboard fontWeight="100" />
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <IoPersonOutline fontSize="20px" />
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <IoCalendarOutline fontSize="20px" />
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <BiBarChartSquare />
      </Circle>
      <Circle p="10px" _hover={{ bgColor: '#9696969d', color: 'white' }}>
        <IoSettingsOutline />
      </Circle>
    </Stack>
  );
};

export default Sidebar;
