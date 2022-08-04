import {
  Box,
  Button,
  Center,
  Circle,
  Flex, FormControl, FormErrorMessage, FormLabel, Grid, Heading, Input, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Select, Stack,
  Text, Textarea, useColorModeValue, useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';
import NoteStack from '../components/NoteStack';
import Sidebar from '../components/Sidebar';
import { auth } from '../firebase.config';
import { authEmail } from '../utils/atom';
import { initialNote, Note, Notes } from '../utils/types';

const Notes = () => {
  const bgcolor = useColorModeValue('white', '#1A202C');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const e = useRecoilValue(authEmail)
  const [newNote, setNewNote] = useState<Note>(initialNote);
  const [notescategory, setNotes] = useState<Notes[]>([]);
  const [userId, setUserId] = useState<Number>();
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        // @ts-ignore
        getNotes(userCred.email)
      }
    });
  },[])
  // @ts-ignore
  function handleModalInputs(e) {
    let value = e.target.value;
    setNewNote({ ...newNote, [e.target.name]: value });
  }
  async function getNotes(email: string) {
    try {
      const dew = await axios({
        method: 'post',
        url: '/api/usernotes',
        data: {
          email: email
        }
      });
      const res = dew.data.notes;
      const id = dew.data.id
      setUserId(id)
      return setNotes(res);
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
    }
  }
  function calcId() {
    let userid
    console.log(userId)
    // @ts-ignore
    return userid = (1 + ((userId-1) * 3))
  }
  async function createNewNote() {
    try {
      const createnote = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newNote,
          noteId: calcId()
        }),
      });
      console.log(createnote);
      onClose();
      return createnote;
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
    } finally {
      setNewNote(initialNote);
      getNotes(e);
    }
  }

  return (
    <>
      <Stack
        direction={['column', 'column', 'row']}
        bgColor={bgcolor}
        w={['100vw', '', '100%']}
        minH="100vh"
      >
        <Box pos="fixed" display={['none', 'none', 'block']} w={['0', '', '']}>
          <Sidebar />
        </Box>
        <BottomNav/>
        <Box
          pos="relative"
          left={['0', '', '50px']}
          minWidth={['100%', '', 'calc(100vw - 60px)']}
          p={['', '','10px','20px', '20px']}
          h="100%"
        >
          <Box px={['10px']}>
            <Navbar />
          </Box>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            px={['10px']}
            mt="20px"
          >
            <Heading fontFamily="Oswald" fontWeight="400">
              Notes
            </Heading>
            <Button
              // display={dis}
              variant="solid"
              _active={{ outline: '0' }}
              size={['sm','sm',"md"]}
              onClick={onOpen}
            >
              <Circle border="1px solid #d8d8d8" size="24px">
                <FaPlus fontSize="10px" />
              </Circle>
              <Text ml={['6px','',"14px"]} fontWeight="400" fontSize={['16px','14px',"20px"]}>
                {' '}
                Add a note{' '}
              </Text>
            </Button>
          </Flex>
          <Flex
            wrap="wrap"
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={['2', '', '5']}
            px={['10px', '', '']}
            py={['30px', '', '20px']}
            pb={['60px', '', '20px']}
            w={['100vw', '', 'calc(100vw - 100px)']}
          >
            {
              notescategory?.map((notesection, id) => (
                <Box key={id} w='100%'>
                  <Heading mt='8px'> {notesection.title}</Heading>
                  <Box w='100%'  mt = '10px' px={['8px','','','','24px']} py={['4px','','','','20px']} border='1px solid #d8d8d8' borderRadius='20px' minHeight='200px'>
                    <Grid
                      templateColumns={['repeat(1, 1fr)','','repeat(2, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']}
                      // wrap="wrap"
                      gap={['1','',"4","4","4"]}
                      alignItems="flex-start"
                      w='100%'
                    >
                      {
                        notesection.notes.length === 0 ?
                          <Center w='100%' minH='200px'>
                            <Text fontSize='20px'>There are no notes here yet.😊</Text>
                          </Center> :
                        notesection.notes.map((notedata, id) => (
                        <NoteStack reload={getNotes} key = {id} title={notedata.title} label={notedata.label} id={notedata.id} noteId={notedata.noteId} note={notedata.note} dOc={notedata.createdAt} />
                      ))
                    }
                    </Grid>

                  </Box>
                </Box>
              ))
            }
          </Flex>
        </Box>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={['sm', 'sm', 'xl']}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="500">Add a new note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Enter note title{' '}
              </FormLabel>
              <Input
                type="text"
                placeholder="Note title"
                name="title"
                value={newNote.title}
                onChange={handleModalInputs}
                variant="flushed"
              />
              <FormErrorMessage> Kindly add a note title </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Note{' '}
              </FormLabel>
              <Textarea
                placeholder="Your note...."
                resize="vertical"
                name="note"
                value={newNote.note}
                onChange={handleModalInputs}
              />
              <FormErrorMessage>
                {' '}
                Kindly add a short description{' '}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Label{' '}
              </FormLabel>
              <Select
                name="label"
                value={newNote.label}
                placeholder="Choose a label"
                onChange={handleModalInputs}
              >
                <option value={'School'}> School </option>
                <option value={'Work'}> Work </option>
                <option value={'Personal'}> Personal </option>
              </Select>
              <FormErrorMessage> Kindly add a label </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createNewNote}>
              Add task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notes;
