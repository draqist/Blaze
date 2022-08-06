import axios from 'axios';
import {
  auth,
  createUserWithEmailAndPassword,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '../firebase.config.js';
import { createeditedtask, createnewtask, Note } from './types.js';

const SignUpwithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};
// @ts-ignore
const SignUpwithEmail = async (
  email: string,
  password: string,
  setError: any,
  Redirect: () => void,
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userMeta) => {
        if (userMeta) {
        } else {
          setError({ state: true, message: 'Error logging in' });
        }
      },
    );
    Redirect();
  } catch (error) {
    // @ts-ignore
    setError({ state: true, message: error.message });
    console.log(error);
  }
};
const SignInwithEmail = async (
  email: string,
  password: string,
  setError: any,
  Redirect: () => void,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then((userMeta) => {
      if (userMeta) {
        Redirect();
      } else {
        // setError({state: true, message: "Error logging in"})
      }
    });
  } catch (error) {
    console.log(error);
    // @ts-ignore
    setError({ state: true, message: error.message });
  }
};
async function getNotes() {
  try {
    const notes = await axios.get('/api/notes');
    console.log(notes.data);
  } catch (error) {
    console.log(error);
  }
}

async function createNewNote(
  newNote: Note,
  onClose: () => void,
  setNewNote: () => void,
  initialNote: any,
) {
  try {
    const createnote = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });
    console.log(createnote);
    onClose();
    return createnote;
  } catch (error) {
    return error;
  } finally {
    // @ts-ignore
    setNewNote(initialNote);
    getNotes();
  }
}
async function createNewTask({
  newTask,
  catid,
  initialTask,
  onClose,
  setTasks,
  rev,
  em,
}: createnewtask) {
  try {
    const createtask = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newTask,
        categoryId: catid,
      }),
    });
    console.log(createtask);
    onClose();
    return createtask;
  } catch (error) {
    return error;
  } finally {
    setTasks(initialTask);
    rev(em);
  }
}
async function createEditedTask({
  uid,
  editedTasks,
  author_id,
  onClose,
  pop,
  e,
}: createeditedtask) {
  try {
    const edittask = await fetch(`/api/tasks/${uid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...editedTasks,
        authorId: author_id,
        uid,
      }),
    });
    return edittask;
  } catch (error) {
    return error;
  } finally {
    pop(e);
    onClose();
  }
}
async function updatecategory(props: any) {
  const { title, id, team, label, author_id, uid, pop, e } = props;
  try {
    const updated = await fetch(`/api/tasks/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description: team,
        label,
        authorId: author_id,
        categoryId: id,
        uid,
      }),
    });
    return updated;
  } catch (error) {
    console.log(error);
  } finally {
    pop(e);
  }
}
// async function deletetask(id: number) {
//   try {
//     await fetch('api/tasks', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         id: id,
//       }),
//     });
//     pop(e);
//   } catch (err) {
//     console.log(err);
//   }
// }
export {
  createEditedTask,
  createNewTask,
  SignUpwithGoogle,
  SignUpwithEmail,
  SignInwithEmail,
  updatecategory,
};
