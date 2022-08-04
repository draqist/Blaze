import {
  Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Tag, Text, Textarea, useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { authEmail } from "../utils/atom";
import { Note, PropsNote } from "../utils/types";


const NoteStack = (props: PropsNote) => {
  const { title, label, note, id, noteId, dOc, reload } = props
  const d = new Date(dOc).toDateString();
  const e = useRecoilValue(authEmail)
  const [editNote, setEditNote] = useState({
    title,
    label,
    note,
  });

  // @ts-ignore
  function handleEditModalInputs(e) {
    const value = e.target.value;
    setEditNote({ ...editNote, [e.target.name]: value });
  }
  async function handleEditedNoteSubmit() {
    try {
      await fetch('/api/notes/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          noteId,
          title: editNote.title,
          label: editNote.label,
          notebody: editNote.note,
          id
        })
      })
    } catch (error) {
      console.log(error)
    } finally {
      reload(e)
      onClose()
    }
  } 
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack
          flexBasis={['100%','33%','50%','50%']}
          minWidth="330px"
          direction="column"
          color={"current"}
          // boxShadow="xs"
          border="1px solid #d8d8d8b3"
          borderRadius="10px"
        p="10px"
        pos='relative'
        overflowX='clip'
        minH={['270px','220px','220px','250px','290px']}
        my='10px'
        >
        <Box>
          <Flex justifyContent='space-between' alignItems='center' py='8px' mb='10px' boxShadow='sm' borderBottom={'1px solid gray'} px='10px'>
            <Text fontSize="24px" > {title} </Text>
            <Box as={Button} onClick={onOpen}>
              <IoPencil/>
            </Box>
            </Flex>
          <Text fontSize="16px" px='10px'> {note} </Text>
        </Box>
        <Flex justifyContent="space-between" pos='absolute' bottom='16px' alignItems="center" w='100%' pr='20px' flexGrow={1}>
          
              <Tag> {d} </Tag>
              <Tag> {label} </Tag>
            </Flex>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered
        size={['sm', 'sm', 'xl']}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="500">Edit note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Note title{' '}
              </FormLabel>
              <Input
                type="text"
                placeholder="Task title"
                name="title"
                value={editNote.title}
                onChange={handleEditModalInputs}
                variant="flushed"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Note {' '}
              </FormLabel>
              <Textarea
                placeholder="Add a short description"
                resize="vertical"
                name="note"
                value={editNote.note}
                onChange={handleEditModalInputs}
              />
              <FormErrorMessage>
                {' '}
                Kindly add a short description{' '}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="400" mt="8px" fontFamily="Oswald">
                Label{' '}
              </FormLabel>
              <Select
                name="label"
                value={editNote.label}
                placeholder="Choose a label"
                onChange={handleEditModalInputs}
              >
                <option value={'School'}> School </option>
                <option value={'Personal'}> Personal </option>
                <option value={'Work'}> Work </option>
              </Select>
              <FormErrorMessage> Kindly add a label </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditedNoteSubmit}>
              Edit task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NoteStack