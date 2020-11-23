import React, { useEffect } from 'react';
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
  let spotifyToken = parseCookies().spotifyAuthToken;
  let deezerToken = parseCookies().deezerAuthToken;
  const router = useRouter();

  useEffect(() => {
    if (!spotifyToken) {
      router.push('/auth');
    }

    if (deezerToken == 'undefined') {
      destroyCookie(null, 'deezerAuthToken');
      deezerToken = null;
    }

    async function checkDeezerToken() {
      if (router.query.code) {
        let res = await fetchDeezerToken(router.query.code);
        setCookie(null, 'deezerAuthToken', res.access_token, {
          maxAge: 60 * 60 * 1000,
        });
        router.push('/auth');
      }
    }
    checkDeezerToken();
  }, [spotifyToken, deezerToken, router.query.code]);

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
            <h2>You are authenticated with Spotify!</h2>
            <Button
              onClick={async (e) => {
                let headers = await deezerAuth();
                router.push(headers['x-final-url']);
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
            redirectUri="https://flexdj.vercel.app/auth"
            clientID={process.env.spotifyClientID}
            scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
          />
          <Button
            onClick={async (e) => {
              let headers = await deezerAuth();
              router.push(headers['x-final-url']);
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
