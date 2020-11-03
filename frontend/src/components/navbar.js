import React from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';

import '../styles/layout.less';

function NavBar() {
  return (
    <div>
      <Layout.Header className={'nav'}>
        <div className="logo" />
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link href="/">FlexDJ</Link>
          </Menu.Item>
          <Menu.Item key="my-profile">
            <Link href="/my-profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="playlists">
            <Link href="/playlists">My Playlists</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    </div>
  );
}

export default NavBar;
