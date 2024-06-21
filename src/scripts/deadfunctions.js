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


  /*
app.post('/getEbayProducts', (req, res) => {
  const searchParams = req.body.searchParams;
  let ebayProductMap = new Map();

  const ebayAuthToken = new EbayAuthToken({
    clientId: EBAY_CLIENT_ID,
    clientSecret: EBAY_CLIENT_SECRET,
    redirectUri: rdr_uri,
  });

  (async () => {
    const token = await ebayAuthToken.getApplicationToken('PRODUCTION');

    for(const searchParam of searchParams) {
      const ebayProductDetails = await getEbayProduct(token, searchParam);
      console.log('received ebay product');
      if(ebayProductDetails)  {
        ebayProductMap.set(searchParam, ebayProductDetails);
      }
    }
    res.json(Object.fromEntries(ebayProductMap));
  })();
})


async function getEbayProduct(token, searchTerm)  {
  const options = {
    method: 'GET',
    url: 'https://api.ebay.com/buy/browse/v1/item_summary/search',
    params: {
      q: searchTerm,
      category_ids: '176985',
      limit: '1'
    },
    headers: {
      'Authorization': 'Bearer ' + token,
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
      'X-EBAY-C-ENDUSERCTX': `affiliateCampaignId=${EBAY_CAMPAIGN_ID}`
    }
  };
  try {
    const response = await axios.request(options);
    //console.log(response);
    if(!response || !(response.data) || !(response.data.itemSummaries))  {
      return;
    }
    const ebayProductDetails = {
      "ebayLink": response.data.itemSummaries[0].itemAffiliateWebUrl,
      "ebayPrice": response.data.itemSummaries[0].price.value,
    }
    return ebayProductDetails;
  } catch (error) {
    console.error(error);
  }
  return null;
}

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}`);
})
*/

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

  /*
  async function getStoreResults2(searchParams, callback) {
    console.log(`executing ${callback}`);
    try {
      const response = await axios.post(SERVER_URI + callback, {
        searchParams
      })
      console.log(response.data);
      const productMap = new Map(Object.entries(response.data));
     
      for(const albumDetails of albumRecommendations)  {
        const product = productMap.get(albumDetails.title + ' ' + albumDetails.artist + ' vinyl');
        //const links = product ? product.map(p => p.link) : [];
        //const prices = product ? product.map(p => p.price) : [];

        if(callback == '/getEbayProducts') {
          albumDetails.ebayProducts = product ? product : [];
          console.log(albumDetails.ebayProducts)
        }
        if(callback == '/getAmazonProducts') {
          //albumDetails.amazonLink = links;
          //albumDetails.amazonPrice = prices;
        }
        if(callback == '/getTargetProducts') {
          //albumDetails.targetLink = links;
          //albumDetails.targetPrice = prices;
        }
      }
      console.log(albumRecommendations);
    }catch (error) {
      console.log(error);
    }
    console.log('Retrieved Product Details')
  }
    */


    /** Set Access Token **/
  /*
  useEffect(() => { 
    if(!accessToken)  {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])
  */


   /** Get Store Results **/
  /*
  useEffect(() => { 
    if(!receivedAllRecommendations) {
      return;
    }
    getAllResults();
  }, [receivedAllRecommendations]);
  */

  /*
  async function getRecommendedAlbums(topArtists)  {
    // get artists most recent 2 albums
    for(const a of topArtists) {
      await getArtistAlbums(a);
    }
    albumRecommendations = Array.from(albumMap.values());
    getAllResults();
  }
    */