import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { List, Card, Avatar, Button, Modal, AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Footer, Navbar, UserContext } from '../components';
import {
  searchSpotify,
  searchYoutube,
  searchDeezer,
  getUserPlaylists,
  addIndividualSong,
} from '../endpoints';
import '../styles/songs.less';
import Link from 'next/link';
import _ from 'lodash';
import { parseCookies } from 'nookies';
import billboardHot100 from '../endpoints/billboard.js';

const { Option } = AutoComplete;
const { Meta } = Card;

function SpotifyRequests() {
  const router = useRouter();
  const spotifyToken = parseCookies().spotifyAuthToken;
  const deezerToken = parseCookies().deezerAuthToken;
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
    form['image'] = song.image;
    form['preview'] = song.preview;
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
    async (val) => setItems(await search(val, spotifyToken, deezerToken)),
    2000
  );

  let [options, setOptions] = useState([]);
  const changeOptions = (value) => {
    value = value.toUpperCase();
    let res = billboardHot100
      .filter((song) => song.value.includes(value))
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

const search = async (val, spotifyToken, deezerToken) => {
  let result = [];

  let spot = spotifyToken ? await searchSpotify(val, spotifyToken) : null;
  let yt = await searchYoutube(val + ' song');
  let deez =
    deezerToken && deezerToken !== 'undefined'
      ? await searchDeezer(val, deezerToken)
      : null;

  let spotItems = spot ? spot.tracks.items : [];
  let ytItems = yt.items;
  let deezItems = deez ? deez.data : [];

  let s = 0;
  let y = 0;
  let d = 0;
  let sDone = spotItems.length > 0 ? false : true;
  let yDone = false;
  let dDone = deezItems.length > 0 ? false : true;

  for (
    let i = 0;
    i < spotItems.length + ytItems.length + deezItems.length;
    i++
  ) {
    if (i % 3 == 0 && !sDone) {
      result.push({
        name: spotItems[s].name,
        artist: spotItems[s].artists[0].name,
        image: spotItems[s].album.images[0].url,
        icon:
          'https://www.iconfinder.com/data/icons/popular-services-brands/512/spotify-512.png',
        url: spotItems[s].external_urls.spotify,
        externalId: spotItems[s].id,
        preview: spotItems[s].preview_url,
      });
      s++;
      if (s == 20) sDone = true;
    } else if ((i % 3 == 1 && !yDone) || (sDone && dDone && !yDone)) {
      result.push({
        name: ytItems[y].snippet.title,
        artist: ytItems[y].snippet.channelTitle,
        image: ytItems[y].snippet.thumbnails.high.url,
        icon:
          'https://i.pinimg.com/originals/31/23/9a/31239a2f70e4f8e4e3263fafb00ace1c.png',
        url: 'https://www.youtube.com/watch?v=' + ytItems[y].id.videoId,
        externalId: ytItems[y].id.videoId,
        preview: null,
      });
      y++;
      if (y == 25) yDone = true;
    } else if (!dDone) {
      result.push({
        name: deezItems[d].title,
        artist: deezItems[d].artist.name,
        image: deezItems[d].album.cover_xl,
        icon:
          'https://images-eu.ssl-images-amazon.com/images/I/51lo-v-XHZL.png',
        url: deezItems[d].link,
        externalId: deezItems[d].id,
        preview: deezItems[d].preview,
      });
      d++;
      if (d == 25) dDone = true;
    } else if (dDone && sDone && yDone) {
      break;
    }
  }
  return result;
};

export default SpotifyRequests;
