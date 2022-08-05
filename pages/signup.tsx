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
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Error, initialUser, Usar } from '../utils/types';
import { SignUpwithEmail, SignUpwithGoogle } from '../utils/utils';
import { SignUpValidations } from '../validations/SignUpValidations';

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
  async function handleSignUp(registervalues:Usar) {
    try {
      const RegUser = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registervalues),
      });
      await SignUpwithEmail(registervalues.email, registervalues.password, setError, Redirect);
      toast({ title: 'Registration Successful', status: 'success', description: "You have been registered successfully", position: 'top',duration: 3000, isClosable: true });
      return RegUser;
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
      // @ts-ignore
      setError({ state: true, message: error.message });
      // @ts-ignore
      toast({ title: 'Registration Failed', status: 'error', description: `${error?.message}`, position: 'top',duration: 3000, isClosable: true });;
    }
  }
  return (
    <Formik
      initialValues={initialUser}
      onSubmit={(registervalues) => {
        handleSignUp(registervalues)
      }}
      validationSchema={SignUpValidations}
    >
      {({ values, handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched }) => {
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
              <Heading mb="10px" fontSize="24px" fontWeight="600" color="gray.700">
                {' '}
                Blaze up !!!{' '}
              </Heading>
              <Box fontWeight="300" textAlign="left">
                <FormControl isInvalid={errors.userName ? true : false} isRequired>
                  <FormLabel htmlFor="userName" fontWeight="400" mt="8px" fontFamily="Oswald">
                    Username{' '}
                  </FormLabel>
                  <Input
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your username"
                  />
                  {errors.userName && touched.userName ? (
                    <FormErrorMessage> Kindly enter a username </FormErrorMessage>) : null}
                </FormControl>
                <FormControl isInvalid={errors.email ? true : false} isRequired>
                  <FormLabel htmlFor="email" fontWeight="400" mt="8px" fontFamily="Oswald">
                    Email address
                  </FormLabel>
                  <Input
                    type="email"
                  autoComplete="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email address"
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                  {errors.email && touched.email ? (
                    <FormErrorMessage>
                      {' '}
                      Kindly enter a valid email address
                    </FormErrorMessage>) : null}
                </FormControl>
                <FormControl isInvalid={errors.password ? true : false} isRequired>
                  <FormLabel htmlFor="password" fontWeight="400" mt="8px" fontFamily="Oswald">
                    Password{' '}
                  </FormLabel>
                  <Input
                    type="password"
                    name="password" 
                    autoComplete="password"
                    placeholder='Enter your password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (<FormErrorMessage> Kindly enter a password </FormErrorMessage>) : null}
                </FormControl>
              </Box>
              <Button mt="16px" w="100%"
                isDisabled={ (errors.userName || errors.email || errors.password) ? true : false}
                /* @ts-ignore */
                onClick={handleSubmit}>
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
        )
      }}
      </Formik>
      );
};

export default Signup;
