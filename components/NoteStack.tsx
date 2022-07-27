import { Box, Collapse, Flex, Stack, Tag, Text } from "@chakra-ui/react"
import { Note } from "../utils/types"


const NoteStack = (props: Note) => {
  const { title, label, note, authorId, noteId, createdAt, } = props
  const d = new Date(createdAt).toDateString();
  return (
    <>
      <Stack
          flexBasis={['33%','33%','50%','33%']}
          minWidth="330px"
          direction="column"
          color={"current"}
          boxShadow="lg"
          border="1px solid #d8d8d8b3"
          borderRadius="10px"
        p="10px"
        pos='relative'
        overflowX='clip'
        minH={'220px'}
        my='10px'
        >
        <Collapse startingHeight={'140px'}>
            <Box py='8px' mb='10px' boxShadow='sm' borderBottom={'1px solid gray'}>
            <Text fontSize="24px" > {title} </Text>
            </Box>
          <Text fontSize="14px"> {note} </Text>
        </Collapse>
            <Flex justifyContent="space-between" pos='absolute' bottom='16px'  alignItems="center" w='100%' pr='20px' flexGrow={1}>
              <Tag> {d} </Tag>
              <Tag> {label} </Tag>
            </Flex>
      </Stack>
    </>
  )
}

export default NoteStack