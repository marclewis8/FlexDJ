import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // if using the included styles
 
function SpotifyLaunch() {
    return (
  <SpotifyAuth
    redirectUri='http://localhost:3000/callback'
    clientID='27680975a57143ea91ad59b76071e135'
    scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
  />
    )
}

export default SpotifyLaunch;