export interface User {
  email: string;
  password: string;
  c_password: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  image: string;
}
export interface Error {
  state: boolean;
  message: string;
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
export interface Task {
  title: string;
  description: string;
  label: string;
  progress: Number;
  dueDate: Date,
  author: User

}
export const initialTask = {
  title: '',
  description: '',
  label: '',
  progress: 0,
  dueDate: new Date(),
  // To call user from local storage here instead of initalUser
  author: initialUser
};
