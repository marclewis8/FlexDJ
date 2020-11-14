import axios from 'axios';

export const searchSpotify = (trackName, token) => {
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

export const searchYT = (trackName) => {
  return axios({
    method: 'get',
    url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${trackName}&type=video&key=${process.env.youtubeAPIKey}`,
  }).then((res) => res.data);
};

export const getArtist = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/artists/5CCwRZC6euC8Odo6y9X8jr',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const getCategories = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/browse/categories',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const getPlaylist = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const getPlaylistTracks = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/playlists/4hLJS87n7SxiTbhq40I1E6/tracks',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const searchArtist = (artistName, token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    params: {
      q: artistName,
      type: 'artist',
    },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};
