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

export const getSpotifyArtist = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/artists/5CCwRZC6euC8Odo6y9X8jr',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const getSpotifyCategories = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/browse/categories',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const getSpotifyPlaylist = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const getSpotifyPlaylistTracks = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/playlists/4hLJS87n7SxiTbhq40I1E6/tracks',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.data);
};

export const searchSpotifyArtist = (artistName, token) => {
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
