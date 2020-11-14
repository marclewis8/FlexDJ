import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu, Button } from 'antd';
import { UserContext } from '../components';

import '../styles/layout.less';

function NavBar() {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);
  const signout = () => {
    logout();
    router.push('/');
  };
  return (
    <div>
      <Layout.Header className={'nav'}>
        <div className="logo" />
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link href="/">FlexDJ</Link>
          </Menu.Item>
          {user && (
            <>
              <Menu.Item key="my-profile">
                <Link href="/my-profile">My Profile</Link>
              </Menu.Item>
              <Menu.Item key="playlists">
                <Link href="/playlists">My Playlists</Link>
              </Menu.Item>
            </>
          )}

          {user && (
            <Menu.Item key="sign-out" className="sign-out">
              <Link href="/">
                <a onClick={signout}>Sign Out</a>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Layout.Header>
    </div>
  );
}

export default NavBar;
