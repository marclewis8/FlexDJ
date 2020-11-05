import React from 'react';
import Link from 'next/link';
import { Footer, Navbar } from '../components';
import { Button, List, Card } from 'antd';

import '../styles/playlists.less';

function Playlists() {
  return (
    <div className="playlists">
      <Navbar />
      <div className="content">
        <h1 id="title">FlexDJ</h1>
        <h2>Your Playlists</h2>
        <PlaylistsView></PlaylistsView>
        <Link href="/">
          <Button type="primary">Back</Button>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}

const data = [
  {
    title: 'party time',
    songs: '10 songs',
  },
  {
    title: 'study grind',
    songs: '6 songs',
  },
  {
    title: 'sad boi',
    songs: '22 songs',
  },
  {
    title: 'workout',
    songs: '18 songs',
  },
  {
    title: 'fun times',
    songs: '10 songs',
  },
  {
    title: 'walking tunes',
    songs: '12 songs',
  },
  {
    title: 'throwback',
    songs: '67 songs',
  },
  {
    title: 'dance',
    songs: '7 songs',
  },
];

function PlaylistsView() {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.title}
            extra={[<a href="404">View </a>, <a href="404">| Edit</a>]}
          >
            {item.songs}
          </Card>
        </List.Item>
      )}
    />
  );
}

export default Playlists;
