import React from 'react';
import Link from 'next/link';

function SignedIn() {
  return (
    <div>
      <h1 id="title">FlexDJ</h1>
      <h2>
        Explore your favorite music from Spotify, YouTube, and SoundCloud!
      </h2>
      <div>
        <SearchBox />
      </div>
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
