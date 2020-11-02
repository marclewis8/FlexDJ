import React from 'react';

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
