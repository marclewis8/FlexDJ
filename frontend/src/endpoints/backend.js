import axios from 'axios';

const url =
  process.env.NODE_ENV !== 'production' ? './api' : process.env.BACKEND_URL;

// User Sign Up & Login
export const postUserSignUp = (form) => {
  return axios
    .post(`${url}/user/add-user`, form)
    .then((res) => {
      return { success: true, data: res.data };
    })
    .catch((e) => {
      let message = e?.response?.data?.message;
      if (message) {
        if (message.includes('password')) {
          message =
            'Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username. Your password cannot be any of your last 4 passwords.';
        } else if (message.includes('login')) {
          message = 'Email is already taken. Use another.';
        }
      }
      return {
        success: false,
        message: message || 'Server Error, Try Again.',
      };
    });
};

export const postUserLogin = (form) => {
  return axios
    .post(`${url}/sign-in`, form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getUserInfo = (userId) => {
  return axios
    .get(`${url}/user/${userId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

// Get User Playlists
export const getUserPlaylists = (userId) => {
  return axios
    .get(`${url}/user/${userId}/playlists`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

// Add & Remove Songs (form needs: name, url, icon, artist, externalId, playlistId)
export const addIndividualSong = (form) => {
  return axios
    .post(`${url}/song/add`, form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const removeIndividualSong = (songId) => {
  return axios
    .post(`${url}/song/remove/${songId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getIndividualSong = (songId) => {
  return axios
    .get(`${url}/song/${songId}`, form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

// Playlist Add & Remove (form needs: name, genre, icon, userId)
export const addPlaylist = (form) => {
  return axios
    .post(`${url}/playlist/add`, form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const removePlaylist = (playlistId) => {
  return axios
    .post(`${url}/playlist/remove/${playlistId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const removeSongFromPlaylist = (playlistId, songId) => {
  return axios
    .post(`${url}/playlist/${playlistId}/remove/${songId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getPlaylist = (playlistId) => {
  return axios
    .get(`${url}/playlist/${playlistId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getPlaylistSongs = (playlistId) => {
  return axios
    .get(`${url}/playlist/${playlistId}/songs`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};
