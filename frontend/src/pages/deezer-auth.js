import React from 'react';
import { Button } from 'antd';
import { deezerAuth } from '../endpoints';
import axios from 'axios';

function DeezerLaunch() {
  axios({
    method: 'get',
    url:
      'https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/auth.php',
    params: {
      app_id: '446022',
      redirect_uri: 'http://localhost:3000/spotify-auth',
      perms: 'basic_access,email',
    },
  });

  return (
    <div>
      <Button onClick={deezerAuth}>Authenticate Deezer</Button>
    </div>
  );
}

export default DeezerLaunch;
