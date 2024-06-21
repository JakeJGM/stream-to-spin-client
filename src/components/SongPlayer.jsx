import SpotifyPlayer from "react-spotify-web-playback";
import './styles/SongPlayer.css';

function SongPlayer({accessToken, albumSpotifyUri})  {
  if(!accessToken) {
    return null;
  }
  console.log(albumSpotifyUri);
  return(
    <div className="song-player">
      <SpotifyPlayer
        token={accessToken}
        play={true}
        showSaveIcon={true}
        uris={albumSpotifyUri ? [albumSpotifyUri] : []}

        styles={{
          bgColor: '#242424',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#B58DD0',
          savedColor: '#fff',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  )
}

export default SongPlayer;