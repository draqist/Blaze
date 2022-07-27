import { atom } from 'recoil';

const UserInfo = atom({
  key: 'User',
  default: {
    userName: '',
    image: '',
    phoneNumber: '',
    email: '',
    password: '',
    bio: '',
  },
});
const authEmail = atom({
  key: 'authEmail',
  default: '',
});
export { UserInfo, authEmail };
