import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../firebase.config';

import { UserInfo } from '../utils/atom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Navbar = ({ UserDetails }: any) => {
  const date = new Date();
  const [userName, setUserName] = useState<String>('');
  // const [displayName, setDisplayName] = useRecoilState(UserInfo);
  const [email, setEmail] = useState('');

  async function getUser(email: string) {
    try {
      const dew = await axios.get(`/api/users/${email}`);
      setUserName(dew.data.userName);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred?.email !== null) {
        // @ts-ignore
        setEmail(userCred.email);
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
      borderBottom="1px solid #d8d8d8b3"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="20px" color="current">
          {' '}
          Welcome back, {userName}
        </Text>
        <Stack direction="row" alignItems="center" justifyContent='center' gap="2">
          {/* <Box w="20px" h="20px" bg="yellow"></Box>
          <Box w="20px" h="20px" bg="green"></Box> */}
          <ColorModeSwitcher/>
          <Text> {date.toDateString()} </Text>
          <Avatar
            size="sm"
            name="User Name"
            src="https://bit.ly/sage-adebayo"
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
