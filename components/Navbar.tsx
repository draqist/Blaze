import { Avatar, Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../firebase.config';
import { authEmail } from '../utils/atom';

import { ColorModeSwitcher } from './ColorModeSwitcher';

const Navbar = () => {
  const date = new Date();
  const [userName, setUserName] = useState<String>('');
  const [displayName, setDisplayName] = useState<String>('');
  const [email, setEmail] = useState('');
  const [ver, setVer] = useRecoilState(authEmail)
  const border = useColorModeValue('none', '1.65px solid #718096');
async function getUser(email: string) {
    try {
      const dew = await axios.get(`/api/users/${email}`);
      setUserName(dew.data.userName);
      setDisplayName(dew.data.fullName);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        // @ts-ignore
        setEmail(userCred.email);
        // @ts-ignore
        setVer(userCred.email)

        // @ts-ignore
        console.log(displayName)
        console.log(email)
        // @ts-ignore
        getUser(userCred.email);
      }
    });
  }, []);

  return (
    <Box
      borderRadius="10px"
      boxShadow="md"
      p={['10px', '', '30px']}
      mb="10px"
      border={border}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize={['16px','','20px']} color="current">
          {' '}
          Welcome back, {userName}
        </Text>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="2"
        >
          {/* <Box w="20px" h="20px" bg="yellow"></Box>
          <Box w="20px" h="20px" bg="green"></Box> */}
          <ColorModeSwitcher />
          <Text fontSize={['12px','','15px']}> {date.toDateString()} </Text>
          <Avatar
            size="sm"
            // @ts-ignore
            name={displayName}
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
