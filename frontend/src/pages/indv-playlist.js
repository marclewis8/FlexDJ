import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Footer, Navbar } from '../components';
import { Button, List, Card } from 'antd';
import { MinusSquareOutlined } from '@ant-design/icons';

import { getPlaylistSongs, removeSongFromPlaylist } from '../endpoints/';
import ReactAudioPlayer from 'react-audio-player';
import '../styles/indv-playlist.less';

function Playlist() {
  const [title, setTitle] = useState('Your Playlist');
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="playlist">
      <Navbar />
      <div className="content">
        <h1 id="title">FlexDJ</h1>
        <h2>{title}</h2>
        <div style={{ flexDirection: 'row' }}>
          <Button type="primary" onClick={handleEdit}>
            {edit ? 'Finish Editing' : 'Edit'}
          </Button>
          <Button type="primary">Play</Button>
        </div>
        <PlaylistList saveTitle={setTitle} edit={edit}></PlaylistList>
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

function PlaylistList({ saveTitle, edit }) {
  const router = useRouter();
  const [songs, setSongs] = useState([]);

  const deleteSong = async (song) => {
    await removeSongFromPlaylist(router.query.id, song.id);
  };

  useEffect(() => {
    async function loadSongs() {
      let res = await getPlaylistSongs(router.query.id);
      if (res && res.data) {
        res.data.songs.forEach((song) => {
          if (song.url.includes('youtube')) {
            song.platform = 'YouTube';
          } else if (song.url.includes('spotify')) {
            song.platform = 'Spotify';
          } else {
            song.platform = 'Deezer';
          }
        });

        setSongs(res.data.songs);
        saveTitle(res.data.name);
      }
    }
    loadSongs();
  }, []);

  return (
    <div className="demo-infinite-container">
      <Card size="large">
        <List
          size="large"
          bordered
          dataSource={songs}
          renderItem={(item) => (
            <List.Item
              actions={[
                edit && (
                  <MinusSquareOutlined
                    onClick={() => deleteSong(item)}
                    key="delete"
                  />
                ),
              ]}
            >
              <strong>{item.name}</strong>
              {item.platform == 'YouTube' ? (
                <ReactPlayer
                  url={item.url}
                  className="youtube-thumbnail"
                  style={{ height: '200px', width: '200px' }}
                />
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
