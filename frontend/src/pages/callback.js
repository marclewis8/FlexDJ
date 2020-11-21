import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { List, Card, Avatar, Button, Modal, AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Footer, Navbar, UserContext } from '../components';
import {
  searchSpotify,
  searchYoutube,
  getUserPlaylists,
  addIndividualSong,
} from '../endpoints';
import '../styles/songs.less';
import Link from 'next/link';
import _ from 'lodash';

const { Option } = AutoComplete;
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
      const result = await getUserPlaylists(user?.id);
      if (result.success) {
        setPlaylists(result.data.playlists);
      }
    };
    getPlaylists();
  }, [user]);

  // Add & Remove Songs (form needs: name, url, icon, artist, externalId, playlistId)
  const addSongtoPlaylist = async (playlist, song) => {
    let form = {};
    form['name'] = song.name;
    form['url'] = song.url;
    form['icon'] = song.icon;
    form['artist'] = song.artist;
    form['externalId'] = song.externalId;
    form['playlistId'] = playlist.id;

    const result = await addIndividualSong(form);
    if (result.success) {
      return Modal.success({
        title: 'Song Added to ' + playlist.name + ' Successfully!',
        content: result.message,
      });
    } else {
      return Modal.error({
        title: 'Failed to Add Song to ' + playlist.name,
        content: result.message,
      });
    }
  };

  function AddPlaylistCards(props) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={playlists}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://www.flaticon.com/svg/static/icons/svg/1051/1051994.svg" />
              }
              title={
                <a onClick={() => addSongtoPlaylist(item, props.song)}>
                  {item.name}
                </a>
              }
              description={item.genre}
            />
          </List.Item>
        )}
      />
    );
  }

  const addSong = (song) => {
    return Modal.info({
      title: 'Add Song to:',
      content: <AddPlaylistCards song={song}></AddPlaylistCards>,
    });
  };

  const onSearch = _.debounce(
    async (val) => setItems(await search(val, token)),
    2000
  );

  let dummySongNames = [
    'WAP',
    'Take Care',
    'Panda',
    'Starboy',
    'Big Sean',
    'Circles',
    'Dubstep',
    'SOS',
    'Burnin Up',
  ];
  dummySongNames = dummySongNames.map((song) => {
    return { label: song, value: song };
  });
  let [options, setOptions] = useState([]);
  const changeOptions = (value) => {
    let res = dummySongNames
      .filter((song) => song.label.substr(0, value.length) === value)
      .slice(0, 3);
    setOptions(res);
  };
  return (
    <div>
      <Navbar></Navbar>
      <AutoComplete onSearch={changeOptions} options={options}>
        <Search onSearch={onSearch} />
      </AutoComplete>
      {items ? (
        <div className="songs">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={items}
            renderItem={(item) => (
              <Card
                style={{ width: 300 }}
                cover={<img alt="thumbnail" src={item.image} />}
                actions={[
                  <PlusSquareOutlined
                    onClick={() => addSong(item)}
                    key="add"
                  />,
                ]}
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

const search = async (val, token) => {
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
        url: spotItems[s].artists[0].href,
        externalId: spotItems[s].artists[0].id,
      });
      s++;
    } else {
      result.push({
        name: ytItems[y].snippet.title,
        artist: ytItems[y].snippet.channelTitle,
        image: ytItems[y].snippet.thumbnails.high.url,
        icon:
          'https://i.pinimg.com/originals/31/23/9a/31239a2f70e4f8e4e3263fafb00ace1c.png',
        url: 'https://www.youtube.com/watch?v=' + ytItems[y].id.videoId,
        externalId: ytItems[y].id.videoId,
      });
      y++;
    }
  }
  return result;
};

export default SpotifyRequests;
