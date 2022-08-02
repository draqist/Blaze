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
  pop: () => void;
  k: any;
  author_id: number;
  calc:number
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
  authorId: Number;
  noteId: Number;
  createdAt: Date;
}
export const initialNote = {
  title: '',
  note: '',
  label: '',
  authorId: 1,
  noteId: 1,
  createdAt: new Date(),
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
}
