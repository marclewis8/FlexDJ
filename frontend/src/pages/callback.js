import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { List, Card, Avatar, Button, Modal } from 'antd';
import Search from 'antd/lib/input/Search';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Footer, Navbar, UserContext } from '../components';
import { searchSpotify, searchYoutube, getUserPlaylists } from '../endpoints';
import '../styles/songs.less';
import Link from 'next/link';

const { Meta } = Card;

function SpotifyRequests() {
  const router = useRouter();
  const token = new URLSearchParams(router.asPath.replace('/callback', '')).get(
    '#access_token'
  );
  const [items, setItems] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const { user } = useContext(UserContext) || {};

  useEffect(() => {
    const getPlaylists = async () => {
      const result = await getUserPlaylists(
        'bd09aac4-193b-482d-b9d4-39d2c3b170a2'
      );
      if (result.success) {
        setPlaylists(result.data);
      }
    };
    getPlaylists();
  });

  const playlistCards = <Card>[Insert Playlist Cards Here]</Card>;

  const addSong = () => {
    console.log(playlists);
    return Modal.info({
      title: 'Select Playlist to Add Song',
      content: playlistCards,
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <Search
        onSearch={async (val) => setItems(await onSearch(val, token))}
      ></Search>
      {items ? (
        <div className="songs">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={items}
            renderItem={(item) => (
              <Card
                style={{ width: 300 }}
                cover={<img alt="thumbnail" src={item.image} />}
                actions={[<PlusSquareOutlined onClick={addSong} key="add" />]}
              >
                <Meta
                  avatar={<Avatar src={item.icon} />}
                  title={item.artist}
                  description={item.name}
                />
              </Card>
            )}
          />
        </div>
      ) : (
        <p></p>
      )}
      <Link href="/">
        <Button type="primary">Back to Home</Button>
      </Link>
      <Footer></Footer>
    </div>
  );
}

const onSearch = async (val, token) => {
  let result = [];
  let spot = await searchSpotify(val, token);
  let yt = await searchYoutube(val + ' song');

  let spotItems = spot.tracks.items;
  let ytItems = yt.items;

  let s = 0;
  let y = 0;

  for (let i = 0; i < spotItems.length + ytItems.length; i++) {
    if (i % 2 == 0 && s < spotItems.length) {
      result.push({
        name: spotItems[s].name,
        artist: spotItems[s].artists[0].name,
        image: spotItems[s].album.images[0].url,
        icon:
          'https://www.iconfinder.com/data/icons/popular-services-brands/512/spotify-512.png',
      });
      s++;
    } else {
      result.push({
        name: ytItems[y].snippet.title,
        artist: ytItems[y].snippet.channelTitle,
        image: ytItems[y].snippet.thumbnails.high.url,
        icon:
          'https://i.pinimg.com/originals/31/23/9a/31239a2f70e4f8e4e3263fafb00ace1c.png',
      });
      y++;
    }
  }

  return result;
};

export default SpotifyRequests;
