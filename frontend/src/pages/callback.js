import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function SpotifyRequests() {
  const [token, setToken] = useState(null);
  const location = useRouter();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setToken(new URLSearchParams(location.pathname).get('#access_token'));
  }, [location]);

  let data = searchTrack('bet on it', token);
  return <div>{data}</div>;
}

function ArtistInfo() {
  return <button onClick={getPlaylist}></button>;
}

async function getArtist(token) {
  let res = axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/artists/5CCwRZC6euC8Odo6y9X8jr',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  let data = await res.data;

  return data;
}

async function getCategories(token) {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/browse/categories',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  let data = await res.data;

  return data;
}

async function getPlaylist(token) {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  let data = await res.data;

  return data;
}

async function getPlaylistTracks(token) {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/playlists/4hLJS87n7SxiTbhq40I1E6/tracks',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  let data = await res.data;

  return data;
}

async function searchArtist(artistName, token) {
  let res = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    params: {
      q: artistName,
      type: 'artist',
    },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  let data = await res.data;
}

function searchTrack(trackName, token) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios({
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
    }).then((res) => {
      setData(res.data);
    });
  }, [data]);

  console.log(data.tracks.href);

  return data;
}

export default SpotifyRequests;
