import React from 'react';
import Link from 'next/link';
import { Footer, Navbar } from '../components';
import { Button, Card } from 'antd';

const { Meta } = Card;

function Profile() {
  return (
    <div className="profile">
      <Navbar></Navbar>
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
