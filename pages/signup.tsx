import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { User } from '../utils/types';
import { SignUpwithEmail, SignUpwithGoogle } from '../utils/utils';

const Signup = () => {
  const [userInfo, setUserInfo] = useState<User>({
    username: '',
    email: '',
    password: '',
    c_password: ''
  })
  // @ts-ignore
  function handleStates(e) {
    let value = e.target.value
    setUserInfo({ ...userInfo, [e.target.name]: value })
    console.log(userInfo)

  }
  return (
    <Center w='100vw' h='100vh'>
      <Box w={['calc(100vw - 40px)','','800px']} textAlign='center' border='1px solid #e9e9e9d6' borderRadius='12px' p={['20px','','40px']} boxShadow='md' >
        <Heading mb='10px' fontSize='24px' fontWeight='600' color='gray.700'> Blaze up !!! </Heading>
        <Box fontWeight='300' textAlign='left'>
          {/* <Form */}
          <FormControl isRequired>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Username </FormLabel>
            <Input type='text' name='username' value ={userInfo.username} onChange={handleStates} />
            <FormErrorMessage> Kindly enter a username </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Email address</FormLabel>
            <Input type='email' autoComplete='email' name='email' value = {userInfo.email} onChange={handleStates} />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormErrorMessage> Kindly enter a valid email address</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Password </FormLabel>
            <Input type='password' autoComplete='password' name='password' value = {userInfo.password} onChange={handleStates} />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight='400' mt='8px' fontFamily='Oswald'>Confirm Password</FormLabel>
            <Input type='password' name='c_password' value = {userInfo.c_password} onChange={handleStates} />
          </FormControl>
        </Box>
        <Button mt='16px' w='100%' onClick={() => SignUpwithEmail(userInfo.email, userInfo.password)}> Sign Up </Button>
        <Button isDisabled mt='16px' w='100%' rightIcon={<FcGoogle fontSize='24px'/>} colorScheme='whatsapp' variant='outline' onClick = {SignUpwithGoogle}> Sign up with  </Button>
      </Box>
    </Center>
  )
}

export default Signup