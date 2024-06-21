import { useState, useEffect } from 'react';
import Header from '../components/Header';
import StreamToSpin from '../components/StreamToSpin';
import AlbumBox from '../components/AlbumBox';
import SongPlayer from '../components/SongPlayer';
import './styles/Home.css';
import RecordPlayer from '../components/RecordPlayer';

function OurPicksPage()  {
  const [albumSpotifyUri, setAlbumSpotifyUri] = useState(null);
  const accessToken = sessionStorage.getItem('accTok');
  
  return(
    <>
      <Header />
      <StreamToSpin size={300}/>
      
      <div className="record-display-container">

        <AlbumBox title={'Zach Bryan'} artist={'Zach Bryan'} imgLink={'https://i.scdn.co/image/ab67616d0000b273e5a25ed08d1e7e0fbb440cef'} key={'6PbnGueEO6LGodPfvNldYf'} ebayPrice={'null'} ebayLink={'null'} amazonPrice={'$???'} amazonLink={'amazon.com'} targetPrice={'null'} targetLink={'null'} albumSpotifyUri={'spotify:album:6PbnGueEO6LGodPfvNldYf'} setAlbumSpotifyUri={setAlbumSpotifyUri} />

        <AlbumBox title={'To Pimp A Butterfly'} artist={'Kendrick Lamar'} imgLink={'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1'} key={'7ycBtnsMtyVbbwTfJwRjSP'} ebayPrice={'null'} ebayLink={'null'} amazonPrice={'$???'} amazonLink={'amazon.com'} targetPrice={'null'} targetLink={'null'} albumSpotifyUri={'spotify:album:7ycBtnsMtyVbbwTfJwRjSP'} setAlbumSpotifyUri={setAlbumSpotifyUri} />

        <AlbumBox title={'Minecraft - Volume Alpha'} artist={'C418'} imgLink={'https://i.scdn.co/image/ab67616d0000b273aaeb5c9fb6131977995b7f0e'} key={'3Gt7rOjcZQoHCfnKl5AkK7'} ebayPrice={'null'} ebayLink={'null'} amazonPrice={'$???'} amazonLink={'amazon.com'} targetPrice={'null'} targetLink={'null'} albumSpotifyUri={'spotify:album:3Gt7rOjcZQoHCfnKl5AkK7'} setAlbumSpotifyUri={setAlbumSpotifyUri} />

        <AlbumBox title={'In Rainbows'} artist={'Radiohead'} imgLink={'https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9'} key={'5vkqYmiPBYLaalcmjujWxK'} ebayPrice={'null'} ebayLink={'null'} amazonPrice={'$???'} amazonLink={'amazon.com'} targetPrice={'null'} targetLink={'null'} albumSpotifyUri={'spotify:album:5vkqYmiPBYLaalcmjujWxK'} setAlbumSpotifyUri={setAlbumSpotifyUri} />
      
      </div>
      {albumSpotifyUri && <SongPlayer accessToken={accessToken} albumSpotifyUri={albumSpotifyUri} />}
    </>
  )
}

export default OurPicksPage;