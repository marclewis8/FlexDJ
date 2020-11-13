import React from 'react';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';

function SpotifyLaunch() {
  return (
    <div>
      <SpotifyAuth
        redirectUri="http://localhost:3000/callback"
        clientID={process.env.spotifyClientID}
        scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
      />
    </div>
  );
}
export default SpotifyLaunch;
