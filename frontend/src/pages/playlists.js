import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { Footer, Navbar, UserContext } from '../components';
import { Button, List, Card, Modal, Form, Row, Col, Input } from 'antd';
import { getUserPlaylists, addPlaylist, removePlaylist } from '../endpoints/';
import '../styles/playlists.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function Playlists() {
  const { user } = useContext(UserContext) || {};
  const [playlists, setPlaylists] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getPlaylists = async () => {
      const result = await getUserPlaylists(user?.id);
      if (result.success) {
        setPlaylists(result.data.playlists);
      }
    };
    getPlaylists();
    setUserId(user?.id);
  });

  function showDeleteConfirm(playlistId) {
    confirm({
      title: 'Are you sure you want to delete this playlist?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletePlaylist(playlistId);
      },
    });
  }

  const createPlaylist = () => {
    return Modal.info({
      title: 'Input New Playlist Info',
      content: <AddPlaylistForm uid={userId}></AddPlaylistForm>,
    });
  };

  const deletePlaylist = async (playlistId) => {
    const result = await removePlaylist(playlistId);
    if (!result.success) {
      return Modal.error({
        title: 'Playlist Deletion Failed',
        content: result.message,
      });
    }
  };

  return (
    <div className="playlists">
      <Navbar />
      <div className="content">
        <h1 id="title">FlexDJ</h1>
        <h2>Your Playlists</h2>
        <Button onClick={createPlaylist} type="primary">
          Add
        </Button>
        {playlists?.length > 0 ? (
          <>
            <List
              dataSource={playlists}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Card
                    className="playlist-card"
                    title={item.name}
                    extra={[
                      <a href="indv-playlist"> View </a>,
                      <a onClick={() => showDeleteConfirm(item.id)}> Delete</a>,
                    ]}
                    key={item.id}
                  >
                    Genre: {item.genre}
                  </Card>
                </List.Item>
              )}
            />
          </>
        ) : (
          <h2>No Playlists Found - Create One!</h2>
        )}
        <Link href="/">
          <Button type="primary">Back</Button>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}

function AddPlaylistForm(props) {
  const onFinish = async (values) => {
    values['icon'] =
      'https://www.iconfinder.com/data/icons/popular-services-brands/512/spotify-512.png';
    values['userId'] = props.uid;
    const result = await addPlaylist(values);
    if (result.success) {
      return Modal.success({
        title: 'Playlist Created Successfully!',
        content: result.message,
      });
    } else {
      return Modal.error({
        title: 'Playlist Creation Failed',
        content: result.message,
      });
    }
  };

  return (
    <div className="addplaylist">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your new playlist name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Genre"
              name="genre"
              rules={[
                {
                  required: true,
                  message: 'Please input your new playlist genre!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Playlists;
