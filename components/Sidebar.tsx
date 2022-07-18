import { Box, Circle, Stack, useColorModeValue } from '@chakra-ui/react'
import {MdOutlineSpaceDashboard} from 'react-icons/md'

const Sidebar = () => {
  const textcolor = useColorModeValue('white', 'black')
  const bgcolor = useColorModeValue('black', 'white')
  return (
    <Stack direction='column' textAlign='center' h='100vh' w='50px' bg={bgcolor} color={textcolor} fontSize='28px' spacing='48px' alignItems='center' py='20px'>
      <Circle p='6px' _hover={{ bgColor: '#9696969d', color:'white' }}>
        <MdOutlineSpaceDashboard color={textcolor} />
      </Circle>
      <Circle p='6px' _hover={{ bgColor: '#9696969d', color:'white' }}>
        <MdOutlineSpaceDashboard color={textcolor} />
      </Circle>
    </Stack>
  )
}

export default Sidebar