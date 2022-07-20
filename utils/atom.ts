import { atom } from 'recoil';

const UserInfo = atom({
  key: 'User',
  default: {
    username: '',
    // image: '',
    // phoneNumber: '',
    email: '',
  },
});

export { UserInfo };
