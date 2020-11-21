import axios from 'axios';

export const deezerAuth = () => {
  axios({
    method: 'get',
    url:
      'https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/auth.php',
    params: {
      app_id: '446022',
      redirect_uri: 'http://localhost:3000/spotify-auth',
      perms: 'basic_access,email',
    },
  });
};

export const searchDeezer = (trackName) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    params: {
      q: trackName,
      type: 'track',
      market: 'US',
    },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};
