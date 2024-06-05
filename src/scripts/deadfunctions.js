async function getEbayResults() {
  for(const albumDetails of albumRecommendations) {
    console.log('ebay');
    const searchParam = albumDetails.title.replace(/\s+/g,"%20") + "%20" + albumDetails.artist.replace(/\s+/g,"%20") + 'vinyl';

    const options = {
      method: 'GET',
      url: 'https://ebay-search-result.p.rapidapi.com/search/' + searchParam,
      headers: {
        'X-RapidAPI-Key': '8be6ad67f4mshfbd610093331e6bp17a034jsn95aa2a71d1c9',
        'X-RapidAPI-Host': 'ebay-search-result.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);

      albumDetails.ebayPrice = response.data.results[0].price;
      albumDetails.ebayLink = response.data.results[0].url;
    } catch (error) {
      console.error(error);
    }
  }
}

/*
    axios.post('http://localhost:3001/getEbayProducts', {
      searchParams
    })
    .then(res => {
      const ebayProductDetails = res.data;
      let i = 0;
      for(const albumDetails of albumRecommendations) { 
        albumDetails.ebayLink = ebayProductDetails[i].ebayLink;
        albumDetails.ebayPrice = ebayProductDetails[i].ebayPrice;
        i++;
      }
      console.log('Album recommendations 2', JSON.stringify(albumRecommendations));
      setRecords(albumRecommendations);
    })
    .catch(() => {
      console.log('error getting Ebay products')
    })
    */

     // get artists most popular albums
    
    /*
    topArtists.forEach(artist => {

      spotifyApi
        .getArtistAlbums(artist.id, {limit: 2, offset: 0 })
        .then(function(data) {
          console.log(data.body.items);
          // add artist albums to recommendations array
          data.body.items.forEach(album => {
            let artists = album.artists.map(artist => artist.name);
            let albumDetails = {
              id: album.id,
              title: album.name,
              artist: artists.join(', '),
              imgLink: album.images[0].url,
              albumSpotifyUri: album.uri,

              ebayPrice: 'null',
              ebayLink: 'null',
              amazonPrice: 'null',
              amazonLink: 'null',
              targetPrice: 'null',
              targetLink: 'null',
            }
            //albumRecommendations.push(albumDetails);
            albumMap.set(album.id, albumDetails);
          })
          
          albumRecommendations = Array.from(albumMap.values());
          setReceivedAllRecommendations(true);
          //setRecords(albumRecommendations);
          //console.log('Album recommendations', JSON.stringify(albumRecommendations));
        })
        .catch(function(err) {
          console.log('Something went wrong!', err);
        });
    })
    */
    