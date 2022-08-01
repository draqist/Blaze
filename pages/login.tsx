import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Error, initialUser, Usar } from '../utils/types';
import { SignInwithEmail, SignUpwithGoogle } from '../utils/utils';

const Signup = () => {
  let router = useRouter();
  let toast = useToast();
  function Redirect() {
    router.push('/dashboard');
  }
  const [userInfo, setUserInfo] = useState<Usar>(initialUser);
  const [err, setError] = useState<Error>({
    state: false,
    message: '',
  });
  console.log(err);
  // @ts-ignore
  function handleStates(e) {
    e.preventDefault();
    let value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.name]: value });
  }
  {
    err?.state &&
      toast({
        title: `${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
  }
  function handleLogIn() {
    SignInwithEmail(userInfo.email, userInfo.password, setError, Redirect);
  }
  return (
    <Center
      as={motion.div}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 2000 } }}
      exit={{ opacity: 0 }}
      w="100vw"
      h="100vh"
    >
      <Box
        w={['calc(100vw - 40px)', '', '800px']}
        textAlign="center"
        border="1px solid #e9e9e9d6"
        borderRadius="12px"
        p={['20px', '', '40px']}
        boxShadow="md"
      >
        <Heading mb="10px" fontSize="24px" fontWeight="600" color="orange.300">
          {' '}
          Blaze in !!!{' '}
        </Heading>
        <Box fontWeight="300" textAlign="left">
          {/* <Form */}
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
        </Box>
        <Button mt="16px" w="100%" onClick={handleLogIn}>
          {' '}
          Sign In{' '}
        </Button>
        <Box textAlign="center" w="100%">
          or
        </Box>
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
          Sign in with{' '}
        </Button>
      </Box>
    </Center>
  );
};

export default Signup;
