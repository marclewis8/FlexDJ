import React, { useContext } from 'react';
import { Form, Row, Input, Col, Modal } from 'antd';
import Link from 'next/link';

import { default as SignedIn } from './signed-in';
import { Footer, Navbar, UserContext } from '../components';
import { postUserLogin } from '../endpoints';

function Home() {
  const { user, storeUser } = useContext(UserContext) || {};
  const signIn = async (values) => {
    const result = await postUserLogin(values);
    if (result.success) {
      storeUser(result.data);
    } else {
      return Modal.error({
        title: 'Login Failed',
        content: 'Invalid email or password. Try again.',
      });
    }
  };

  return (
    <div className="homepage">
      <Navbar />
      {user ? (
        <SignedIn />
      ) : (
        <div className="content">
          <h2>Sign in to create playlists!</h2>
          <Form onFinish={signIn}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input className="input" placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    className="input"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div id="login">
              <button type="submit">Login</button>
              <Link href="/sign-up">
                <button>Sign Up</button>
              </Link>
            </div>
          </Form>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
