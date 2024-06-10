import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import StreamToSpin from '../components/StreamToSpin';
import axios from 'axios';
import AlbumBox from '../components/AlbumBox';
import useAuth from '../scripts/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import './styles/Home.css';
import SongPlayer from '../components/SongPlayer';

const CLIENT_ID = 'f8be2f0469254d999018468ce325b315';
const SERVER_URI = 'https://stream-to-spin-server.onrender.com';
//const SERVER_URI = 'http://localhost:3001';


const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
})
let albumRecommendations = [];

function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const accessToken = useAuth(code);

  const albumMap = new Map();

  const [topArtists, setTopArtists] = useState([]);
  const [receivedAllRecommendations, setReceivedAllRecommendations] = useState(false);
  const [records, setRecords] = useState(null);
  const [albumSpotifyUri, setAlbumSpotifyUri] = useState(null);

  /** Set Access Token **/
  useEffect(() => { 
    if(!accessToken)  {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])


  /** Get User's Top Artists **/
  useEffect(() => { 
    if(!accessToken)  {
      return;
    }
    // get users top artists
    spotifyApi
      .getMyTopArtists({ limit: 2, offset: 2 })
      .then(function(data) {
        setTopArtists(data.body.items);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken]);


  async function getRecommendedAlbums()  {
      // get artists most recent 2 albums
      console.log('starting loop');
      for(const a of topArtists) {
        await getArtistAlbums(a);
      }
      console.log('out of loop');
      albumRecommendations = Array.from(albumMap.values());
      setReceivedAllRecommendations(true);
  }

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

        ebayPrice:   'null',
        ebayLink:    'null',
        amazonPrice: 'null',
        amazonLink:  'null',
        targetPrice: 'null',
        targetLink:  'null',
      }
      albumMap.set(album.id, albumDetails);
    })
    console.log('in loop');
  }
  
  useEffect(() => { 
    if(!topArtists || !accessToken) {
      return;
    }
    getRecommendedAlbums(topArtists);
  }, [topArtists]);
  
  /** Get Store Results **/
  useEffect(() => { 
    if(!receivedAllRecommendations) {
      return;
    }
    getAllResults();
    //calculateResults();
  }, [receivedAllRecommendations]);

  /*
  async function calculateResults()  {
    await getAllResults();
    setRecords(albumRecommendations);
  }
  */

  async function getAllResults()  {
    // Get search query for all albums 
    let searchParams = [];
    for(const albumDetails of albumRecommendations) {
      searchParams.push(albumDetails.title + ' ' + albumDetails.artist + ' vinyl');
    }
    console.log(searchParams);

    //let ebayPromise = getEbayResults(searchParams);
    //let amazonPromise = getAmazonResults();
    //let targetPromise = getTargetResults();
    /*
    Promise.all([ebayPromise])
    .then(() => {
      setRecords(albumRecommendations);
    }, err => {
      console.log(err);
    });
    */
   for(const albumDetails of albumRecommendations) {
    albumDetails.amazonPrice = '$29.99';
    albumDetails.amazonLink = 'https://www.amazon.com/';
    albumDetails.ebayPrice = '$45.87';
    albumDetails.ebayLink = 'https://www.ebay.com/';
    albumDetails.targetPrice = '$38.05';
    albumDetails.targetLink = 'https://www.target.com/';
   }
   setRecords(albumRecommendations);
  }

  async function getEbayResults(searchParams) {
    console.log('in ebay results');
    // call to server
    try {
      const response = await axios.post(SERVER_URI + '/getEbayProducts', {
        searchParams
      })
      console.log(response.data);
      const ebayProductMap = new Map(Object.entries(response.data));
     
      for(const albumDetails of albumRecommendations)  {
        const ebayProduct = ebayProductMap.get(albumDetails.title + ' ' + albumDetails.artist + ' vinyl');
        albumDetails.ebayLink = ebayProduct ? ebayProduct.ebayLink : 'null';
        albumDetails.ebayPrice = ebayProduct ? '$' + ebayProduct.ebayPrice : 'null';
      }
      console.log(albumRecommendations);
    }catch (error) {
      console.log(error);
    }
    console.log('Retrieved ebay product details')
  }


  async function getAmazonResults()  {
    console.log('in amazon results');
    for(const albumDetails of albumRecommendations) {
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
          query: albumDetails.title + ' ' + albumDetails.artist + ' vinyl',
          page: '1',
          country: 'US'
        },
        headers: {
          'X-RapidAPI-Key': '8be6ad67f4mshfbd610093331e6bp17a034jsn95aa2a71d1c9',
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);

        albumDetails.amazonPrice = response.data.data.products[0].product_price;
        albumDetails.amazonLink = response.data.data.products[0].product_url;
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function getTargetResults()  {
    console.log('in target results');
    for(const albumDetails of albumRecommendations) {
      const options = {
        method: 'GET',
        url: 'https://target13.p.rapidapi.com/searchByKeywords',
        params: {
          keywords: albumDetails.title + ' ' + albumDetails.artist + ' vinyl',
          store_id: '3411',
          count: '10',
          sort_by: 'relevance',
          include_sponsored: 'false'
        },
        headers: {
          'X-RapidAPI-Key': '8be6ad67f4mshfbd610093331e6bp17a034jsn95aa2a71d1c9',
          'X-RapidAPI-Host': 'target13.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);

        const products = response.data.search.products.filter(product => product.item.product_description.title.toLowerCase().includes(albumDetails.title.toLowerCase()) && product.item.product_description.title.toLowerCase().includes('vinyl'));

        albumDetails.targetPrice = products ? products[0].price.formatted_current_price : null;
        albumDetails.targetLink = products ? products[0].item.enrichment.buy_url : null;
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <StreamToSpin />
      <div className="record-display-container">
        {records ? records.map((album) => (
          <AlbumBox title={album.title} artist={album.artist} imgLink={album.imgLink} key={album.id} ebayPrice={album.ebayPrice} ebayLink={album.ebayLink} amazonPrice={album.amazonPrice} amazonLink={album.amazonLink} targetPrice={album.targetPrice} targetLink={album.targetLink} albumSpotifyUri={album.albumSpotifyUri} setAlbumSpotifyUri={setAlbumSpotifyUri}/>
        ))
        : <p className="loading-text">...Loading Records <FontAwesomeIcon className="record-icon" icon={faRecordVinyl} /></p>}
      </div>
      {albumSpotifyUri && <SongPlayer accessToken={accessToken} albumSpotifyUri={albumSpotifyUri} />}
    </>
  )
}

export default Home;