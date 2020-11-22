import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { Footer, Navbar, UserContext } from '../components';
import { Button, Card } from 'antd';
import { getUserInfo } from '../endpoints';

const { Meta } = Card;

function Profile() {
  const { user } = useContext(UserContext) || {};
  const [userInfo, setUserInfo] = useState({});
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const result = await getUserInfo(user?.id);
      if (result.success) {
        setUserInfo(result.data);
        setBirthdate(result.data.birthdate);
      }
    };
    getUser();
  });

  return (
    <div className="profile">
      <Navbar />
      <div className="content">
        <h2>
          <strong>
            <u>FlexDJ</u>
          </strong>
        </h2>
        {user ? (
          <>
            <h2>Welcome, {userInfo?.firstName}!</h2>
            <Card hoverable title="Your Profile" style={{ width: 600 }}>
              <p>
                <strong>Username:</strong> {userInfo?.username}
              </p>
              <p>
                <strong>First Name:</strong> {userInfo?.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {userInfo?.lastName}
              </p>
              <p>
                <strong>Email:</strong> {userInfo?.email}
              </p>
              <p>
                <strong>Birthday:</strong> {birthdate.substring(0, 10)}
              </p>
            </Card>
            <Link href="/">
              <Button type="primary">Back</Button>
            </Link>
          </>
        ) : (
          <h2>No Account Found</h2>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Profile;
