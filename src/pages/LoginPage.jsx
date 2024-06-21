import './styles/LoginPage.css';
import 'animate.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import StreamToSpin from '../components/StreamToSpin';
import RecordPlayer from '../components/RecordPlayer';
import Phone from '../components/Phone';

const CLIENT_ID = 'f8be2f0469254d999018468ce325b315';
const rdr_uri = 'http://localhost:5173/home';
//const rdr_uri = 'https://streamtospin.vercel.app/home';

function LoginPage() {
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(false);

  function authorizeSpotify() {
    const scope = 'user-read-private user-read-email user-top-read streaming user-read-playback-state user-modify-playback-state';
    const state = 'state1'; 

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${rdr_uri}&scope=${scope}&state=${state}`;

    // Redirect user to Spotify authorization page
    window.location.href = authUrl;
  }

  useEffect(() =>  {
    setTimeout(function() {
      setShow(true);
    }, 3000)
  }, []);


  //<p className="description-text">Put your favorite artists into your vinyl collection</p>
  //<h1 className="title-text">Find Vinyl Records Based on Your Listening History</h1>

  return (
    <>
    <div className="outer-container">
      <div className="login-container">
      <h1>Stream To Spin</h1>
      <div className="phone-container">
        <Phone />
      </div>
      {show &&
      <div className="record-player-container">
        <RecordPlayer zoom={0.80} play={true}/>
      </div>
      }
        <p >Find Vinyl Records Based on Your Listening History</p>
        <button className="spotify-login-button" onClick={authorizeSpotify}>
          <FontAwesomeIcon className="spotify-icon" icon={faSpotify} /> &nbsp; 
          Login with Spotify
        </button>
      </div>
    </div>
    </>
  )
}

export default LoginPage;


/*
 
        <div className="phone-container">
          <Phone />
        </div>
        {show &&
        <div className="record-player-container">
          <RecordPlayer zoom={0.80} play={true}/>
        </div>
        }
*/