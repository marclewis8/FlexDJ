import React from 'react';
import Cookies from 'js-cookie';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import Link from 'next/link';

function SpotifyLaunch() {
  const token = Cookies.get('spotifyAuthToken');
  return (
    <div className="app">
      {token ? (
        <div>
          <p>You are authorized with token: {token}</p>
          <Link href="/callback">
            <button type="submit"></button>
          </Link>
        </div>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback"
          clientID="..."
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
        />
      )}
    </div>
  );
}
export default SpotifyLaunch;
