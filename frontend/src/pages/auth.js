import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { Button } from 'antd';

function SpotifyLaunch() {
  const router = useRouter();
  const spotifyToken = parseCookies().spotifyAuthToken;

  return (
    <div>
      {spotifyToken ? (
        <div>
          <h1>You are authenticated with Spotify!</h1>
          <Button>Authenticate with Deezer</Button>
          <Link href="./search">
            <Button>Start Searching!</Button>
          </Link>
        </div>
      ) : (
        <div>
          <SpotifyAuth
            redirectUri="http://localhost:3000/auth"
            clientID={process.env.spotifyClientID}
            scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
          />
          <Button onClick={deezerAuth}>Authenticate with Deezer</Button>
        </div>
      )}
    </div>
  );
}

function deezerAuth() {
  axios({
    method: 'get',
    url:
      'https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/auth.php',
    params: {
      app_id: '446022',
      redirect_uri: 'http://localhost:3000/auth',
      perms: 'basic_access,email',
    },
  });
}
export default SpotifyLaunch;
