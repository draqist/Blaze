import {
  Box,
  Button,
  Circle,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMove } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { taskcard } from '../utils/types';

const Taskcard = ({ title, team, progress, date, label, uid, pop, k, author_id }: taskcard) => {
  const d = new Date(date).toDateString();
  const [selId, setSelId] = useState(uid)
  const [catid, setCatId] = useState(1)
  useEffect(() => {
    console.log(selId)
  }, [])
  let colorscheme;
  if (label === 'Critical') {
    colorscheme="red"
  } else if (label === 'High Priority') {
    colorscheme = 'pink'
  } else {
    colorscheme = 'teal'
  }
  async function update(id: number) {
    try {
      const updated = await fetch(`/api/tasks/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          description: team,
          label: label,
          authorId: author_id,
          categoryId: id,
          uid: uid
        })
      })
      pop()
      return updated
    } catch (error) {
      console.log(error)
    }
  }
  async function deletetask(id: number) {
    try {
      await fetch('api/tasks', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id
        })
      })
      pop()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Box
        w="300px"
        h="175px"
        boxShadow="lg"
        border="1px solid #d8d8d8b3"
        borderRadius="10px"
        p="10px"
      >
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Text fontSize="20px"> {title} </Text>
            <Text fontSize="12px"> {team}</Text>
          </Box>
          <Menu>
            <MenuButton
              borderRadius="50%"
              textAlign="center"
              size="sm"
              w="30px"
              h="30px"
              as={Button}
              outline="none"
              variant="unstyled"
            >
              <Circle
                border="1px solid #d3d3d4"
                size="26px"
                _hover={{ bgColor: '#E2E8F0' }}
              >
                <FaEllipsisH fontSize="16px" />
              </Circle>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<MdOutlineEdit fontSize='18px'/>}>Edit</MenuItem>
              <MenuItem icon={<IoMove fontSize='18px'/>} onClick={() => update(2)} >Move to W-I-P</MenuItem>
              <MenuItem icon={<IoMove fontSize='18px'/>}  onClick={() => update(3)} >Move to Review </MenuItem>
              <MenuItem onClick={() => update(4)} >Move to Completed</MenuItem>
              <MenuItem color="red" onClick={()=> deletetask(uid)}> Delete </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box mt="18px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="14px"> Progress </Text>
            <Text fontSize="12px"> {progress}</Text>
          </Flex>
          <Progress
            isAnimated
            h="6px"
            borderRadius="10px "
            mt="6px"
            color="green"
            value={10}
          />
        </Box>
        <Box mt="18px">
          <Flex justifyContent="space-between" alignItems="center">
            <Tag> {d} </Tag>
            <Tag colorScheme={colorscheme}> {label} </Tag>
            {/* <Stack direction="row" gap="2">
              <Box w="20px" h="20px" bg="yellow"></Box>
              <Box w="20px" h="20px" bg="green"></Box>
            </Stack> */}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Taskcard;
