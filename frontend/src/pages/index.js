import { useState } from 'react';
import React from 'react';
import { default as SignedIn } from './signed-in';
import Link from 'next/link';
import { Footer, Navbar } from '../components';

function Home() {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = () => {
    setSignedIn(true);
  };

  return (
    <div className="homepage">
      <Navbar />
      {signedIn ? (
        <SignedIn />
      ) : (
        <div className="content">
          <h1 id="title">FlexDJ</h1>
          <h2>Sign in to create playlists!</h2>
          <div>
            <input className="input" type="text" placeholder="Username"></input>
            <input
              className="input"
              type="password"
              placeholder="Password"
            ></input>
            <div id="login">
              <button type="submit" onClick={signIn}>
                Login
              </button>
              <Link href="/sign-up">
                <button type="submit">Sign Up</button>
              </Link>
              <Link href="/platapi">
                <button type="submit">Spotify</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
