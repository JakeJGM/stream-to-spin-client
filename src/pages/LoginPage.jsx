import './styles/LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import StreamToSpin from '../components/StreamToSpin';

const CLIENT_ID = 'f8be2f0469254d999018468ce325b315';
//const rdr_uri = 'http://localhost:5173/home';
const rdr_uri = 'https://streamtospin.vercel.app/home';

function LoginPage() {

  function authorizeSpotify() {
    const scope = 'user-read-private user-read-email user-top-read streaming user-read-playback-state user-modify-playback-state';
    const state = 'state1'; 

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${rdr_uri}&scope=${scope}&state=${state}`;

    // Redirect user to Spotify authorization page
    window.location.href = authUrl;
  }

  return (
    <>
      <div className="login-container">
        <StreamToSpin />
        <button className="spotify-login-button" onClick={authorizeSpotify}>
          <FontAwesomeIcon className="spotify-icon" icon={faSpotify} /> &nbsp; 
          Login with Spotify
        </button>
      </div>
    </>
  )
}

export default LoginPage;