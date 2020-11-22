import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Footer, Navbar } from '../components';
import { Button, List, Card, Image } from 'antd';
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
        <h2 id="plTitle">{title}</h2>
        <div class="controls" style={{ flexDirection: 'row' }}>
          <Button
            type="primary"
            onClick={handleEdit}
            style={{ marginTop: '0px', marginBottom: '10px' }}
          >
            {edit ? 'Finish Editing' : 'Edit'}
          </Button>
          <Button
            type="primary"
            style={{ marginTop: '0px', marginBottom: '10px' }}
          >
            Play
          </Button>
          <Link href="/playlists">
            <Button
              type="primary"
              className="playlist-back"
              style={{ marginTop: '0px', marginBottom: '10px' }}
            >
              Back
            </Button>
          </Link>
        </div>
        <PlaylistList saveTitle={setTitle} edit={edit}></PlaylistList>
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
              <Image
                src={item.image}
                alt="Song Image"
                height="150px"
                width="150px"
              ></Image>
              <div class="songTitle">
                <strong>
                  {item.name.replaceAll('&quot;', '"').replaceAll('&amp;', '&')}
                </strong>
                <p style={{ fontSize: '15px', marginTop: '5px' }}>
                  By: {item.artist}
                </p>
              </div>
              {item.platform == 'YouTube' ? (
                <ReactPlayer
                  url={item.url}
                  className="youtube-thumbnail"
                  height="20%"
                  width="30%"
                />
              ) : (
                <p></p>
              )}
              {item.platform == 'Deezer' || item.platform == 'Spotify' ? (
                <ReactAudioPlayer src={item.preview} controls playsinline />
              ) : (
                <p></p>
              )}
              <a href={item.url} target="_blank">
                <Image src={item.icon} height="50px" width="50px"></Image>
              </a>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Playlist;
