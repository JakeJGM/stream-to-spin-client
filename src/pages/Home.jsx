import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import StreamToSpin from '../components/StreamToSpin';
import axios from 'axios';
import AlbumBox from '../components/AlbumBox';
import useAuth from '../scripts/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import './styles/Home.css';
import SongPlayer from '../components/SongPlayer';
import Header from '../components/Header';
import RecordPlayer from '../components/RecordPlayer';

const CLIENT_ID = 'f8be2f0469254d999018468ce325b315';
//const SERVER_URI = 'https://stream-to-spin-server.onrender.com';
const SERVER_URI = 'http://localhost:3001';


const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
})
let albumRecommendations = [];

function Home() {
  const [records, setRecords] = useState(null);
  const [albumSpotifyUri, setAlbumSpotifyUri] = useState(null);
  const albumMap = new Map();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  if(code !== null || code !== undefined)  {
    useAuth(code);
  }
  
  const accessToken = sessionStorage.getItem('accTok');


  /** Get User's Top Artists **/
  useEffect(() => { 
    if(!accessToken || accessToken === undefined || urlParams.has('q'))  {
      return;
    }
    if(sessionStorage.getItem('savedRecords') !== null && !records)  {
      const temp = JSON.parse(sessionStorage.getItem('savedRecords'));
      setRecords(temp);
      return;
    }

    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMyTopArtists({ limit: 10, offset: 0 })
      .then(function(data) {
        const promiseArr = data.body.items.map(item => getArtistAlbums(item));
        Promise.all(promiseArr)
        .then(() =>  {
          albumRecommendations = Array.from(albumMap.values());
          getAllResults('home')
        })
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken]);
  

  useEffect(() => {
    if(!urlParams.has('q') || records)  {
      return;
    }
    const query = urlParams.get('q');
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .searchAlbums(query, { limit: 2, offset: 0 })
      .then(function(results)  {
        results.body.albums.items.forEach(album => {
          let artists = album.artists.map(artist => artist.name);
          let albumDetails = {
            id: album.id,
            title: album.name,
            artist: artists.join(', '),
            imgLink: album.images[0].url,
            albumSpotifyUri: album.uri,
    
            ebayPrice: 'null', ebayLink: 'null', amazonPrice: 'null', amazonLink:  'null', targetPrice: 'null', targetLink:  'null'
          }
          albumMap.set(album.id, albumDetails);
        })
      })
      .then(() => {
        albumRecommendations = Array.from(albumMap.values());
        getAllResults('search');
      })
    
  }, [urlParams]);

  /** Get User's Recommended Albums **/
  async function getArtistAlbums(artist)  {
    const results = await spotifyApi.getArtistAlbums(artist.id, {limit: 2, offset: 0 });
    results.body.items.forEach(album => {
      let artists = album.artists.map(artist => artist.name);
      let albumDetails = {
        id: album.id,
        title: album.name,
        artist: artists.join(', '),
        imgLink: album.images[0].url,
        albumSpotifyUri: album.uri,

        ebayPrice: 'null', ebayLink: 'null', amazonPrice: 'null', amazonLink:  'null', targetPrice: 'null', targetLink:  'null'
      }
      albumMap.set(album.id, albumDetails);
    })
  }

  async function getAllResults(type)  {
    let searchParams = [];
    for(const albumDetails of albumRecommendations) {
      searchParams.push({
        "q":albumDetails.title + ' ' + albumDetails.artist + ' vinyl',
        "title":albumDetails.title
      });
    }

    let promiseArray = [];
    promiseArray.push(getStoreResults(searchParams, '/getEbayProducts'));
    
    Promise.all(promiseArray)
    .then(() => {
      setRecords(albumRecommendations);
      if(type === 'home')  {
        sessionStorage.setItem('savedRecords', JSON.stringify(albumRecommendations));
      }
    }, err => {
      console.log(err);
    });
  }

  async function getStoreResults(searchParams, callback) {
    console.log(`executing ${callback}`);
    try {
      const response = await axios.post(SERVER_URI + callback, {
        searchParams
      })
      console.log(response.data);
      const productMap = new Map(Object.entries(response.data));
     
      for(const albumDetails of albumRecommendations)  {
        const product = productMap.get(albumDetails.title + ' ' + albumDetails.artist + ' vinyl');
        const link = product ? product.link : 'null';
        const price = product ? product.price : 'null';

        if(callback == '/getEbayProducts') {
          albumDetails.ebayLink = link;
          albumDetails.ebayPrice = price;
        }
        if(callback == '/getAmazonProducts') {
          albumDetails.amazonLink = link;
          albumDetails.amazonPrice = price;
        }
        if(callback == '/getTargetProducts') {
          albumDetails.targetLink = link;
          albumDetails.targetPrice = price;
        }
      }
    }catch (error) {
      console.log(error);
    }
    console.log('Retrieved Product Details')
  }

  return (
    <>
      <Header />
      <StreamToSpin size={300}/>
      <div className="record-display-container">
        {records ? records.map((album) => (
          <AlbumBox title={album.title} artist={album.artist} imgLink={album.imgLink} key={album.id} ebayPrice={album.ebayPrice} ebayLink={album.ebayLink} amazonPrice={album.amazonPrice} amazonLink={album.amazonLink} targetPrice={album.targetPrice} targetLink={album.targetLink} albumSpotifyUri={album.albumSpotifyUri} setAlbumSpotifyUri={setAlbumSpotifyUri} />
        ))
        : <p className="loading-text">...Loading Records <FontAwesomeIcon className="record-icon" icon={faRecordVinyl} /></p>
        }
      </div>
      {albumSpotifyUri && <SongPlayer accessToken={accessToken} albumSpotifyUri={albumSpotifyUri} />}
    </>
  )
}

export default Home;