import React, { useContext } from 'react';
import Link from 'next/link';
import { default as SignedIn } from './signed-in';
import { Footer, Navbar, UserContext } from '../components';
import { Button, Card, Modal } from 'antd';
import { getUserInfo } from '../endpoints';

const { Meta } = Card;

function Profile() {
  const { user } = useContext(UserContext) || {};
  console.log(user.id);

  const getUser = async (userid) => {
    const result = await getUserInfo(user.userId);
    if (result.success) {
      return result.data;
    } else {
      return Modal.error({
        title: 'Profile Not Found',
        content: 'Try logging in again.',
      });
    }
  };

  const userInfo = getUser(user.id);

  return (
    <div className="profile">
      <Navbar />
      <div className="content">
        <h1 id="title">FlexDJ</h1>
        <h2>Welcome, Anna!</h2>
        <ProfileCard></ProfileCard>
        <Link href="/">
          <Button type="primary">Back</Button>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}

function ProfileCard() {
  return (
    <Card
      hoverable
      title="Your Profile"
      extra={<a href="404">Edit</a>}
      style={{ width: 600 }}
    >
      <p>
        <strong>First Name:</strong> Anna
      </p>
      <p>
        <strong>Last Name:</strong> Xu
      </p>
      <p>
        <strong>Birthday:</strong> 05/30/2000
      </p>
      <p>
        <strong>Username:</strong> @annnajx
      </p>
      <p>
        <strong>Password:</strong> ********
      </p>
    </Card>
  );
}

export default Profile;
