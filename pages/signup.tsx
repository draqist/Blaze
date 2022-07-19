import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc';
import { SignUpwithGoogle } from '../utils/utils';

const Signup = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Box w={['calc(100vw - 40px)','','800px']} textAlign='center' border='1px solid #e9e9e9d6' borderRadius='12px' p={['20px','','40px']} boxShadow='md' >
        <Heading mb='10px' fontSize='24px' fontWeight='600' color='gray.700'> Blaze up !!! </Heading>
        <Box fontWeight='300' textAlign='left'>
          {/* <Form */}
          <FormControl isRequired>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Username </FormLabel>
            <Input type='text' />
            <FormErrorMessage> Kindly enter a username </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Email address</FormLabel>
            <Input type='email' autoComplete='email' />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormErrorMessage> Kindly enter a valid email address</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Password </FormLabel>
            <Input type='password' autoComplete='password' />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Confirm Password</FormLabel>
            <Input type='password' />
          </FormControl>
        </Box>
        <Button mt='16px' w='100%'> Sign Up </Button>
        <Button mt='16px' w='100%' rightIcon={<FcGoogle fontSize='24px'/>} colorScheme='whatsapp' variant='outline' onClick = {() => SignUpwithGoogle()}> Sign up with  </Button>
      </Box>
    </Center>
  )
}

export default Signup