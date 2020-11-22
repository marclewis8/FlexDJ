import React from 'react';
import Link from 'next/link';

function SignedIn() {
  return (
    <div>
      <h1 id="title">FlexDJ</h1>
      <h2>Explore your favorite music from Spotify, YouTube, and Deezer!</h2>
      <Link href="./search">
        <button>Start Searching!</button>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <h3>To check or add authentication for Spotify and Deezer:</h3>
      <Link href="./auth">
        <button type="submit">Authenticate</button>
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

export default SignedIn;
