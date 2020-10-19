import { useState, useEffect } from 'react';


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
      <div>
        <SearchBox/>
      </div>
      <h2>Sign in to create playlists!</h2>
      <Login></Login>
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
            <button type="submit">Login</button>
            <button type="submit">Sign Up</button>
        </div>
      </div>
  )
}

// function Logo() {
//   return <img src={require('../images/logodj.png')} alt="Logo for Site" width="500" height="500"></img>
// }

export default Home;
