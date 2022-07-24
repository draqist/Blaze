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
};
export interface Usar {
  email: string;
  password: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  image: string;
}
export const initialUser = {
  userName: '',
  email: '',
  password: '',
  c_password: '',
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
