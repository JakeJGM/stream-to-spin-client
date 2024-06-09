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
    

     //let albumRecommendations = JSON.parse('[{"id":"18NOKLkZETa4sWwLMIm0UZ","title":"UTOPIA","artist":"Travis Scott","imgLink":"https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"3mH6qwIy9crq0I9YQbOuDf","title":"Blonde","artist":"Frank Ocean","imgLink":"https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "}]');

  // https://www.amazon.com/dp/B0BRJW3PKF

  //let albumRecommendations = JSON.parse('[{"id":"18NOKLkZETa4sWwLMIm0UZ","title":"UTOPIA","artist":"Travis Scott","imgLink":"https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"1Sf8GsXG32t0jNrX11xqWx","title":"JACKBOYS","artist":"JACKBOYS","imgLink":"https://i.scdn.co/image/ab67616d0000b273dfc2f59568272de50a257f2f","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"79ONNoS4M9tfIA1mYLBYVX","title":"Mr. Morale & The Big Steppers","artist":"Kendrick Lamar","imgLink":"https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"3pLdWdkj83EYfDN6H2N8MR","title":"Black Panther The Album Music From And Inspired By","artist":"Kendrick Lamar","imgLink":"https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"3mH6qwIy9crq0I9YQbOuDf","title":"Blonde","artist":"Frank Ocean","imgLink":"https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"392p3shh2jkxUxY2VHvlH8","title":"channel ORANGE","artist":"Frank Ocean","imgLink":"https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"3bSNhnaQQXpC639OQ4pMyP","title":"WE STILL DON\'T TRUST YOU","artist":"Future","imgLink":"https://i.scdn.co/image/ab67616d0000b273d353552c4c2932094456bbe9","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "},{"id":"4iqbFIdGOTzXeDtt9owjQn","title":"WE DON\'T TRUST YOU","artist":"Future","imgLink":"https://i.scdn.co/image/ab67616d0000b273a46b07c291e6dfdee13b3ee8","ebayPrice":"$29.99","ebayLink":" ","amazonPrice":"$29.99","amazonLink":" ","targetPrice":"$29.99","targetLink":" "}]');
  
  //const albumRecommendations = JSON.parse('[{"id":"18NOKLkZETa4sWwLMIm0UZ","title":"UTOPIA","artist":"Travis Scott","imgLink":"https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44"},{"id":"1Sf8GsXG32t0jNrX11xqWx","title":"JACKBOYS","artist":"JACKBOYS","imgLink":"https://i.scdn.co/image/ab67616d0000b273dfc2f59568272de50a257f2f"},{"id":"79ONNoS4M9tfIA1mYLBYVX","title":"Mr. Morale & The Big Steppers","artist":"Kendrick Lamar","imgLink":"https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f"},{"id":"3pLdWdkj83EYfDN6H2N8MR","title":"Black Panther The Album Music From And Inspired By","artist":"Kendrick Lamar","imgLink":"https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888"},{"id":"3mH6qwIy9crq0I9YQbOuDf","title":"Blonde","artist":"Frank Ocean","imgLink":"https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526"},{"id":"392p3shh2jkxUxY2VHvlH8","title":"channel ORANGE","artist":"Frank Ocean","imgLink":"https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5"},{"id":"3bSNhnaQQXpC639OQ4pMyP","title":"WE STILL DON\'T TRUST YOU","artist":"Future","imgLink":"https://i.scdn.co/image/ab67616d0000b273d353552c4c2932094456bbe9"},{"id":"4iqbFIdGOTzXeDtt9owjQn","title":"WE DON\'T TRUST YOU","artist":"Future","imgLink":"https://i.scdn.co/image/ab67616d0000b273a46b07c291e6dfdee13b3ee8"}]');