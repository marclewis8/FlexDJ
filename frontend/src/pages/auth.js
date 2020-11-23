import React from 'react';
import Link from 'next/link';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { Button } from 'antd';
import { deezerAuth, fetchDeezerToken } from '../endpoints';
import { Footer, Navbar } from '../components';
import _ from 'lodash';
import '../styles/styles.less';

function SpotifyLaunch() {
  const spotifyToken = parseCookies().spotifyAuthToken;
  const deezerToken = parseCookies().deezerAuthToken;
  const router = useRouter();
  if (deezerToken == 'undefined') {
    destroyCookie(null, 'deezerAuthToken');
    deezerToken = null;
  }
  return (
    <div>
      <Navbar />
      {spotifyToken ? (
        deezerToken ? (
          <div>
            <h2>You are authenticated with Spotify and Deezer!</h2>
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
          <Button
            className="spotify-button"
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
        </div>
      )}
      <Footer />
    </div>
  );
}

export default SpotifyLaunch;
