import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { letter, projectdescription, sentence } from '../extras';

const Home: NextPage = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      px={['10px', '', '40px']}
      py="20px"
      bg="#10101A"
      bgColor="linear-gradient(`180deg,rgba(35,37,49,.5),rgba(15,15,24,.5))"
      backdropFilter="blur(54px)"
      bgImage={'url("Background.svg")'}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          fontWeight="600"
          bgGradient="linear(45deg, #6bc5f8, #7928CA, #FF2080,#6bc5f8)"
          bgClip="text"
          fontSize={['28px', '', '40px']}
        >
          {' '}
          Blazers{' '}
        </Heading>
        <Stack direction="row" alignItems="center" gap={['2', '', '4']}>
          <Button variant="outline" colorScheme="whatsapp">
            <NextLink href="/signup">Sign Up</NextLink>{' '}
          </Button>
          <Button variant="solid" colorScheme="purple" color="white">
            <NextLink href="/login">Log In </NextLink>
          </Button>
        </Stack>
      </Flex>
      <Box
        as={motion.div}
        variants={sentence}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        pos="absolute"
        bottom={['80px', '', '140px', '90px', '40px']}
        w={['calc(100% -40px', '', '700px']}
        px={['', '', '0']}
      >
        {projectdescription.split('').map((char, index) => {
          return (
            <Text
              as={motion.span}
              key={char + '-' + index}
              variants={letter}
              color="white"
              fontSize={['', '', '36px']}
            >
              {char}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
