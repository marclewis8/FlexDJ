import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Footer, Navbar } from '../components';
import { Button, List, Card } from 'antd';
import { getPlaylistSongs } from '../endpoints/';
import ReactAudioPlayer from 'react-audio-player';
import '../styles/indv-playlist.less';

function Playlist() {
  return (
    <div className="playlist">
      <Navbar />
      <div className="content">
        <h1 id="title">FlexDJ</h1>
        <h2>Title</h2>
        <div style={{ flexDirection: 'row' }}>
          <Button type="primary">Edit</Button>
          <Button type="primary">Play</Button>
        </div>
        <PlaylistList></PlaylistList>
        <Link href="/playlists">
          <Button type="primary" className="playlist-back">
            Back
          </Button>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}

const data = [
  {
    platform: 'Deezer',
    title: 'Freaking Me Out',
    url:
      'https://cdns-preview-6.dzcdn.net/stream/c-63008283820619d243fa84498f991860-6.mp3',
  },
  {
    platform: 'YouTube',
    title: 'Bet on It',
    url: 'https://www.youtube.com/watch?v=k-t4vqd534Y',
  },
  {
    platform: 'Spotify',
    title: 'Panda',
    url:
      'https://p.scdn.co/mp3-preview/f1dd31865324f13731030330509046cfdcb3ef62?cid=27680975a57143ea91ad59b76071e135',
  },
];

function PlaylistList() {
  const router = useRouter();
  const [playlistId, setId] = useState(router.query.id);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function loadSongs() {
      console.log(playlistId);
      let res = await getPlaylistSongs(playlistId);
      console.log(res);
      setSongs(res.data);
    }
    loadSongs();
  }, []);

  return (
    <div className="demo-infinite-container">
      <Card size="large">
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <strong>{item.title}</strong>
              {item.platform == 'YouTube' ? (
                <ReactPlayer url={item.url} />
              ) : (
                <br></br>
              )}
              {item.platform == 'Deezer' || item.platform == 'Spotify' ? (
                <ReactAudioPlayer src={item.url} controls playsinline />
              ) : (
                <br></br>
              )}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Playlist;
