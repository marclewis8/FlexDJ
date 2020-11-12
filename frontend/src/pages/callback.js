import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function SpotifyRequests() {
  let url = window.location;

  let access_token = new URLSearchParams(url.search).get('access_token');
  alert(access_token);
  return <button onClick={getPlaylistTracks}></button>;
}

function ArtistInfo() {
  return <button onClick={getPlaylist}></button>;
}

async function getArtist() {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/artists/5CCwRZC6euC8Odo6y9X8jr',
    headers: {
      Authorization:
        'Bearer BQAtLhM8O5AYEWuXW3P20luCbRic4aFs6tCWv678mYybFhbLHlmEYwwzvDCpREcwGdidkNbFkUcQeI67ye92zsupeNYjIbXQw6qRMsVcmcXoEtDxNe_8vyHPHYbM0WI6GB8UN1K094dUtuLYCI6cpC40EOa1htlzDNSYubAKScqXpXyK_xU',
    },
  });

  let data = await res.data;

  return data;
}

async function getCategories() {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/browse/categories',
    headers: {
      Authorization:
        'Bearer BQAtLhM8O5AYEWuXW3P20luCbRic4aFs6tCWv678mYybFhbLHlmEYwwzvDCpREcwGdidkNbFkUcQeI67ye92zsupeNYjIbXQw6qRMsVcmcXoEtDxNe_8vyHPHYbM0WI6GB8UN1K094dUtuLYCI6cpC40EOa1htlzDNSYubAKScqXpXyK_xU',
    },
  });

  let data = await res.data;

  return data;
}

async function getPlaylist() {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization:
        'Bearer BQAtLhM8O5AYEWuXW3P20luCbRic4aFs6tCWv678mYybFhbLHlmEYwwzvDCpREcwGdidkNbFkUcQeI67ye92zsupeNYjIbXQw6qRMsVcmcXoEtDxNe_8vyHPHYbM0WI6GB8UN1K094dUtuLYCI6cpC40EOa1htlzDNSYubAKScqXpXyK_xU',
    },
  });

  let data = await res.data;

  return data;
}

async function getPlaylistTracks() {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/playlists/4hLJS87n7SxiTbhq40I1E6/tracks',
    headers: {
      Authorization:
        'Bearer BQAtLhM8O5AYEWuXW3P20luCbRic4aFs6tCWv678mYybFhbLHlmEYwwzvDCpREcwGdidkNbFkUcQeI67ye92zsupeNYjIbXQw6qRMsVcmcXoEtDxNe_8vyHPHYbM0WI6GB8UN1K094dUtuLYCI6cpC40EOa1htlzDNSYubAKScqXpXyK_xU',
    },
  });

  let data = await res.data;

  return data;
}

export default SpotifyRequests;
