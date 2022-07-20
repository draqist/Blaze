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

export { UserInfo };
