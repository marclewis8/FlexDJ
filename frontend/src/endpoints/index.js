import axios from 'axios';

// User Sign Up & Login
export const postUserSignUp = (form) => {
  return axios
    .post('./api/user/add-user', form)
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
    .post('./api/sign-in', form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getUserInfo = (id) => {
  return axios
    .get(`./api/user/${id}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

// Get User Playlists
export const getUserPlaylists = (id) => {
  return axios
    .get(`./api/user/${id}/playlists`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

// Add & Remove Songs
export const addIndividualSong = (form) => {
  return axios
    .post('./api/song/add', form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const removeIndividualSong = (id) => {
  return axios
    .post(`./api/song/remove/${id}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getIndividualSong = (id) => {
  return axios
    .get(`./api/song/${id}`, form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

// Playlist Add & Remove
export const addPlaylist = (form) => {
  return axios
    .post('./api/playlist/add', form)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const removePlaylist = (id) => {
  return axios
    .post(`./api/playlist/remove/${id}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const removeSongFromPlaylist = (playlistId, songId) => {
  return axios
    .post(`./api/playlist/${playlistId}/remove/${songId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getPlaylist = (playlistId) => {
  return axios
    .get(`./api/playlist/${playlistId}`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};

export const getPlaylistSongs = (playlistId) => {
  return axios
    .get(`./api/playlist/${playlistId}/songs`)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((e) => {
      return { success: false, message: e.message };
    });
};
