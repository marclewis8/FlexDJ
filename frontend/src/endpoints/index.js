import axios from 'axios';

export const postUserSignUp = (form) => {
  console.log('form', form);
  axios.post('./api/user/add-user', form).then((res) => {
    console.log(res);
  });
};
