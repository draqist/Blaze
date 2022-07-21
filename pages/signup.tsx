import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../utils/atom';
import { Error, initialUser, User } from '../utils/types';
import { SignUpwithEmail, SignUpwithGoogle } from '../utils/utils';

const Signup = () => {
  let router = useRouter();
  let toast = useToast();
  const [bioData, setBioData] = useRecoilState(UserInfo);
  function Redirect() {
    router.push('/dashboard');
  }
  const [userInfo, setUserInfo] = useState<User>(initialUser);
  const [err, setError] = useState<Error>({
    state: false,
    message: '',
  });
  // @ts-ignore
  function handleStates(e) {
    e.preventDefault();
    let value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.name]: value });
  }
  err?.state &&
    toast({
      title: `${err.message}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  async function handleSignUp() {
    setBioData({
      ...bioData,
      email: userInfo.email,
      password: userInfo.password,
      bio: userInfo.bio,
      image: userInfo.image,
      userName: userInfo.userName,
      phoneNumber: userInfo.phoneNumber,
    });
    SignUpwithEmail(userInfo.email, userInfo.password, setError, Redirect);
    try {
      const RegUser = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      return RegUser;
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
    }
  }
  return (
    <Center w="100vw" h="100vh">
      <Box
        w={['calc(100vw - 40px)', '', '800px']}
        textAlign="center"
        border="1px solid #e9e9e9d6"
        borderRadius="12px"
        p={['20px', '', '40px']}
        boxShadow="md"
      >
        <Heading mb="10px" fontSize="24px" fontWeight="600" color="gray.700">
          {' '}
          Blaze up !!!{' '}
        </Heading>
        <Box fontWeight="300" textAlign="left">
          <FormControl isRequired>
            <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
              Username{' '}
            </FormLabel>
            <Input
              type="text"
              name="userName"
              value={userInfo.userName}
              onChange={handleStates}
            />
            <FormErrorMessage> Kindly enter a username </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
              Email address
            </FormLabel>
            <Input
              type="email"
              autoComplete="email"
              name="email"
              value={userInfo.email}
              onChange={handleStates}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormErrorMessage>
              {' '}
              Kindly enter a valid email address
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
              Password{' '}
            </FormLabel>
            <Input
              type="password"
              autoComplete="password"
              name="password"
              value={userInfo.password}
              onChange={handleStates}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
              Confirm Password
            </FormLabel>
            <Input
              type="password"
              name="c_password"
              value={userInfo.c_password}
              onChange={handleStates}
            />
          </FormControl>
        </Box>
        <Button mt="16px" w="100%" onClick={handleSignUp}>
          {' '}
          Sign Up{' '}
        </Button>
        <Button
          isDisabled
          mt="16px"
          w="100%"
          rightIcon={<FcGoogle fontSize="24px" />}
          colorScheme="whatsapp"
          variant="outline"
          onClick={SignUpwithGoogle}
        >
          {' '}
          Sign up with{' '}
        </Button>
      </Box>
    </Center>
  );
};

export default Signup;
