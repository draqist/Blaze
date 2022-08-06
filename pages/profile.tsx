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
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import { auth } from '../firebase.config';
import { authEmail } from '../utils/atom';
import { Settings, settingsUser } from '../utils/types';

const Profile = () => {
  const [userdata, setUserdata] = useState<Settings>(settingsUser);
  const verEmail = useRecoilValue(authEmail);
  const [success, setSuccess] = useState(false);
  let toast = useToast();
  async function getUser(email: string) {
    try {
      const dew = await axios.get(`/api/users/${email}`);
      setUserdata(dew.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateBio() {
    try {
      const userBio = await fetch(`/api/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userdata),
      });
      getUser(userdata.email);
      if (userBio.status === 200) {
        setSuccess(true);
      } else {
        console.log(userBio);
      }
      return userBio;
    } catch (error) {
      error &&
        toast({
          // @ts-ignore
          title: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
    }
  }
  success &&
    toast({
      title: 'Profile updated successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  // @ts-ignore
  function handleBios(e) {
    const value = e.target.value;
    setUserdata({
      ...userdata,
      [e.target.name]: value,
    });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        // @ts-ignore
        getUser(userCred.email);
      }
    });
  }, []);
  return (
    <Stack
      direction={['column', 'column', 'row']}
      w={['100vw', '', '100%']}
      minH="100vh"
    >
      <Box pos="fixed" display={['none', 'none', 'block']} w={['0', '', '']}>
        <Sidebar />
      </Box>
      <BottomNav />
      <Box
        pos="relative"
        left={['0', '', '52px', '0px', '60px']}
        w={[
          '100%',
          '',
          'calc(100vw - 60px)',
          'calc(100vw - 60px)',
          'calc(100vw - 200px)',
        ]}
        px={['20px', '', '20px', '130px', '200px']}
        py={['40px', '', '20px', '130px', '60px']}
        m="0"
        h="100%"
      >
        <Center
          w={[
            'calc(100vw - 40px)',
            'calc(100vw - 120px)',
            'calc(100vw - 120px)',
            '800px',
          ]}
        >
          <Box
            w="100%"
            textAlign="center"
            border="1px solid #e9e9e9d6"
            borderRadius="12px"
            p={['20px', '', '40px']}
            boxShadow="md"
          >
            <Heading
              mb="10px"
              fontSize="24px"
              fontWeight="600"
              color="gray.700"
            >
              {' '}
              Your Profile{' '}
            </Heading>
            <Box fontWeight="300" textAlign="left">
              <FormControl>
                <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                  Full Name{' '}
                </FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  value={userdata.fullName === null ? '' : userdata.fullName}
                  onChange={handleBios}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                  Username{' '}
                </FormLabel>
                <Input
                  type="text"
                  name="userName"
                  value={userdata.userName}
                  onChange={handleBios}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  autoComplete="email"
                  name="email"
                  value={userdata.email}
                  onChange={handleBios}
                  isDisabled
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                <FormErrorMessage>
                  {' '}
                  Kindly enter a valid email address
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                  Bio
                </FormLabel>
                <Textarea
                  placeholder="Write yourself a short bio....."
                  value={userdata.bio}
                  name="bio"
                  onChange={handleBios}
                />
                <FormErrorMessage>
                  {' '}
                  Kindly enter a valid email address
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                  Phone number
                </FormLabel>
                <Input
                  type="number"
                  name="phoneNumber"
                  value={userdata.phoneNumber}
                  onChange={handleBios}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                  Password{' '}
                </FormLabel>
                <Input
                  type="password"
                  autoComplete="password"
                  name="password"
                  value={userdata.password}
                  onChange={handleBios}
                />
              </FormControl>
            </Box>
            <Button mt="16px" w="100%" onClick={updateBio}>
              {' '}
              Click to update{' '}
            </Button>
          </Box>
        </Center>
      </Box>
    </Stack>
  );
};

export default Profile;
