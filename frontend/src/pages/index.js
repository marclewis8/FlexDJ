import { useState, useEffect } from 'react';
import Link from 'next/link'
import React from 'react'
import { Button } from 'antd'


function Home() {
  // const [res, setRes] = useState("no response");
  // useEffect(() => {
  //   async function getUsers() {
  //     const res = await fetch("http://localhost:3001/user/3");
  //     setRes(res);
  //   }
  //   getUsers();
  // }, [res]);
  return (
    <div>
      <h1 id="title">FlexDJ</h1>
      <h2>Explore your favorite music from Spotify, YouTube, and SoundCloud!</h2>
        <div id="sign">
          <h2>Sign in to start creating playlists!</h2>
          <Login></Login>
        </div>
    </div>
  );
}

function SearchBox() {
  return (
      <input className="input" type="text" placeholder="Search for Music..."></input>
  )
}

function Login() {
  return (
      <div>
        <input className="input" type="text" placeholder="Username"></input>
        <input className="input" type="text" placeholder="Password"></input>
        <div id="login">
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
            <button type="submit">Log in</button>
        </div>
      </div>
  )
}

// function Logo() {
//   return <img src={require('../images/logodj.png')} alt="Logo for Site" width="500" height="500"></img>
// }

export default Home;
