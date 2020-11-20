import React from 'react';
import Link from 'next/link';
import { Footer, Navbar } from '../components';
import { Button, List, Card } from 'antd';

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
    title: 'Song 1',
    time: '5:07',
  },
  {
    title: 'Song 2',
    time: '3:23',
  },
  {
    title: 'Song 3',
    time: '4:47',
  },
  {
    title: 'Song 4',
    time: '4:01',
  },
  {
    title: 'Song 5',
    time: '4:01',
  },
  {
    title: 'Song 6',
    time: '4:01',
  },
];

function PlaylistList() {
  return (
    <div className="demo-infinite-container">
      <Card size="large">
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <strong>{item.title}</strong> {item.time}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Playlist;
