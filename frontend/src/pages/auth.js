import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import { Button } from 'antd';
import { deezerAuth, fetchDeezerToken } from '../endpoints';

function SpotifyLaunch() {
  const spotifyToken = parseCookies().spotifyAuthToken;
  const deezerToken = parseCookies().deezerAuthToken;
  const router = useRouter();

  return spotifyToken ? (
    deezerToken ? (
      <div>
        <h1>You are authenticated with Spotify and Deezer!</h1>
        <Link href="./search">
          <Button>Start Searching!</Button>
        </Link>
      </div>
    ) : (
      <div>
        <h1>You are authenticated with Spotify!</h1>
        <Button
          onClick={async (e) => {
            let headers = await deezerAuth();
            router.push(headers['x-final-url']);
            let res = await fetchDeezerToken(router.query.code);
            setCookie(null, 'deezerAuthToken', res.access_token, {
              maxAge: 60 * 60 * 1000,
            });
          }}
        >
          Authenticate with Deezer
        </Button>
        <Link href="./search">
          <Button>Start Searching!</Button>
        </Link>
      </div>
    )
  ) : (
    <div>
      <SpotifyAuth
        redirectUri="http://localhost:3000/auth"
        clientID={process.env.spotifyClientID}
        scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
      />
      <Button>Authenticate with Deezer</Button>
    </div>
  );
}

export default SpotifyLaunch;
