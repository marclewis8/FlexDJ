import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { Button } from "antd";

function Home() {
  return (
    <div>
      <h1 id="title">FlexDJ</h1>
      <h2>
        Explore your favorite music from Spotify, YouTube, and SoundCloud!
      </h2>
      <div>
        <SearchBox />
      </div>
      <h2>Sign in to create playlists!</h2>
      <Login></Login>
      <Link href="./platapi">
          <Button type="submit">Spotify</Button>
        </Link>
    </div>
  );
}

function SearchBox() {
  return (
    <input
      className="input"
      type="text"
      placeholder="Search for Music..."
    ></input>
  );
}

function Login() {
  return (
    <div>
      <input className="input" type="text" placeholder="Username"></input>
      <input className="input" type="password" placeholder="Password"></input>
      <div id="login">
        <Button type="submit">Login</Button>
        <Link href="./signup">
          <Button type="submit">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
