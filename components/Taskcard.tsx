import {
  Box,
  Circle,
  Flex,
  Progress,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';
import { taskcard } from '../utils/types';

const Taskcard = ({ title, team, progress, date, label }: taskcard) => {
  const d = new Date(date).toDateString()
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
          <Circle
            size="24px"
            border="1px solid #d3d3d4"
            textAlign="center"
            _hover={{ bg: '#E2E8F0', color: 'gray.700' }}
          >
            <FaEllipsisH fontSize="16px" />
          </Circle>
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
            <Tag> {label} </Tag>
            <Stack direction="row" gap="2">
              <Box w="20px" h="20px" bg="yellow"></Box>
              <Box w="20px" h="20px" bg="green"></Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Taskcard;
