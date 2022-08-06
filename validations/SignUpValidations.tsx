import * as Yup from 'yup';

export const SignUpValidations = Yup.object().shape({
  userName: Yup.string().required('Required').min(2, 'Atleast 2 characters'),
  email: Yup.string().required('Required').email('email should be valid'),
  password: Yup.string().required('Required').min(6, 'Atleast 6 characters'),
});
