import { Box,Circle, Flex, Heading,Progress,Stack,Tag,Text } from '@chakra-ui/react'
import React from 'react'

const Taskcard = () => {
  return (
    <Box w='300px' h='175px' boxShadow='md' border='1px solid #d8d8d8b3' borderRadius='10px' p='10px'>
      <Flex justifyContent='space-between' alignItems='flex-start'> 
        <Box>
          <Text fontSize='20px'> Design Splash screen </Text>
          <Text fontSize='12px'> Blaze Inc.</Text>
        </Box>
        <Circle size='' border='1px solid' textAlign='center'>
          <></>
        </Circle>
      </Flex>
      <Box mt='18px'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Text fontSize='14px'> Progress </Text>
          <Text></Text>
        </Flex>
        <Progress isAnimated h='6px' borderRadius='10px ' mt='6px' color='green' value={10}/> 
      </Box>
      <Box mt='18px'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Tag> Date </Tag>
          <Stack direction='row' gap='2'>
            <Box w='20px' h='20px' bg='yellow'></Box>
            <Box w='20px' h='20px' bg='green'></Box>
          </Stack>
        </Flex>
      </Box>
    </Box>
  )
}

export default Taskcard