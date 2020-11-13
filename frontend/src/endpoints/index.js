import axios from 'axios';

export const postUserSignUp = (form) => {
  return axios
    .post('./api/user/add-user', form)
    .then((res) => {
      return { success: true, data: res.data };
    })
    .catch((e) => {
      let message = e?.response?.data?.message;
      if (message) {
        if (message.includes('password')) {
          message =
            'Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username. Your password cannot be any of your last 4 passwords.';
        } else if (message.includes('login')) {
          message = 'Email is already taken. Use another.';
        }
      }
      return {
        success: false,
        message: message || 'Server Error, Try Again.',
      };
    });
};

export const postUserLogin = (form) => {
  return axios
    .post('./api/sign-in', form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};
