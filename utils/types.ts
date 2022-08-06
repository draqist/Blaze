import { Dispatch, SetStateAction } from 'react';
export interface User {
  email: string;
  password: string;
  c_password: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  image: string;
}

export type taskcard = {
  title: string;
  team: string;
  progress: string;
  date: string;
  label: string;
  uid: number;
  pop: (arg: String) => void;
  k: any;
  author_id: number;
  calc: number;
};
export interface Usar {
  email: string;
  password: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  image: string;
}
export interface Settings {
  email: string;
  password: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  image: string;
  fullName: string;
}

export const settingsUser = {
  userName: '',
  email: '',
  password: '',
  bio: '',
  phoneNumber: '',
  image: '',
  fullName: '',
};
export const initialUser = {
  userName: '',
  email: '',
  password: '',
  bio: '',
  phoneNumber: '',
  image: '',
};
export const theUser = {
  userName: '',
  email: '',
  password: '',
  bio: '',
  phoneNumber: '',
  image: '',
};
export interface Task {
  title: string;
  description: string;
  label: string;
  authorId: Number;
  categoryId: Number;
  dueDate: Date;
  createdAt: Date;
  // progress: Number;
}
export interface Note {
  title: string;
  note: string;
  label: string;
  noteId: number;
  createdAt: string;
  id: number;
}
export const initialNote = {
  title: '',
  note: '',
  label: '',
  noteId: 1,
  createdAt: '',
  id: 1,
};

export type PropsNote = {
  title: string;
  label: string;
  id: number;
  noteId: number;
  dOc: string;
  note: string;
  reload: (a: string) => void;
};

export const initialTask = {
  title: '',
  description: '',
  label: '',
  authorId: 1,
  categoryId: 1,
  dueDate: new Date(),
  createdAt: new Date(),
  // progress: 0,
  // To call user from local storage here instead of initalUser
};

export interface Error {
  state: boolean;
  message: string;
}
export type Category = {
  id: Number;
  title: string;
  tasks: Task[];
};
export type Notes = {
  id: Number;
  title: string;
  notes: Note[];
};

export type createnewtask = {
  newTask: Task;
  catid: number;
  initialTask: Task;
  onClose: () => void;
  setTasks: Dispatch<SetStateAction<Task>>;
  rev: (arg: String) => void;
  em: string;
};
export type createeditedtask = {
  editedTasks: {
    title: string;
    description: string;
    progress: string;
    date: string;
    label: string;
  };
  uid: number;
  author_id: number;
  onClose: () => void;
  pop: (arg: String) => void;
  e: string;
};
export type updatecategory = {
  title: string;
  team: string;
  label: string;
  author_id: string;
  id: number;
  uid: number;
  pop: (arg: String) => void;
  e: string;
};
