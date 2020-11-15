import axios from 'axios';

export const searchYoutbe = (trackName) => {
  return axios({
    method: 'get',
    url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${trackName}&type=video&key=${process.env.youtubeAPIKey}`,
  }).then((res) => res.data);
};
