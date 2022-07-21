export interface User {
  email: string;
  password: string;
  c_password: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  image: string;
}
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
  progress: Number;
  dueDate: Date;
  author_id: Number;
}
export const initialTask = {
  title: '',
  description: '',
  label: '',
  progress: 0,
  dueDate: new Date(),
  // To call user from local storage here instead of initalUser
  author_id: 0,
};

  export interface Error {
    state: boolean;
    message: string;
  }