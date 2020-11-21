import axios from 'axios';

export const deezerAuth = () => {
  return axios({
    method: 'get',
    url:
      'https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/auth.php',
    params: {
      app_id: process.env.deezerAppID,
      redirect_uri: 'http://localhost:3000/auth',
      perms: 'basic_access,email',
    },
  }).then((res) => res.headers);
};

export const fetchDeezerToken = (code) => {
  return axios({
    method: 'get',
    url:
      'https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php',
    params: {
      app_id: process.env.deezerAppID,
      secret: process.env.deezerSecret,
      code: code,
      output: 'json',
    },
  }).then((res) => res.data);
};

export const searchDeezer = (trackName, token) => {
  return axios({
    method: 'get',
    url: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search',
    params: {
      q: trackName,
    },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};
