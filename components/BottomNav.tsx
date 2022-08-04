import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BiBarChartSquare } from 'react-icons/bi'
import { IoCalendarOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import NextLink from 'next/link'

const BottomNav = () => {
  const bgcolor = useColorModeValue('#1A202C', 'white');
  const iconcolor = useColorModeValue('white','#1A202C');
  return (
    <Box
        w="100%"
        display={['block', 'block', 'none']}
        zIndex="1"
        h="60px"
        pos="fixed"
        bottom="0"
        bg={bgcolor}
        marginInlineStart='0'
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          zIndex="2"
          color={iconcolor}
          px="30px"
          h="100%"
        >
          <NextLink href="/dashboard">
            <MdOutlineSpaceDashboard fontWeight="100" fontSize="20px" />
          </NextLink>
          <NextLink href="/notes">
            <BiBarChartSquare fontSize="20px" />
          </NextLink>
          <NextLink href="/profile">
            <IoPersonOutline fontSize="20px" />
          </NextLink>
          <NextLink href="/calendar">
            <IoCalendarOutline fontSize="20px" />
        </NextLink>
        <NextLink href='/settings'>
          <IoSettingsOutline fontSize="20px" />
        </NextLink>
        </Flex>
      </Box>
  )
}

export default BottomNav