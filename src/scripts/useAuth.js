import axios from 'axios';
import { useState, useEffect } from'react';

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();


  /** Get access code **/
  useEffect(() => {
    if(!code) {
      return;
    }
    axios
    .post('http://localhost:3001/login', {
      code,
    })
    .then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);
      window.history.pushState({}, null, '/home');
    })
    .catch(() => {
      //window.location = '/';
    })
  }, [code])


  /** Get refresh code **/
  useEffect(() => {
    if(!refreshToken || !expiresIn) {
      return; 
    }
    const interval = setInterval(() => {

      axios
      .post('http://localhost:3001/refresh', {
        refreshToken,
      })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
        console.log(res.data);
        //window.history.pushState({}, null, '/home');
      })
      .catch(() => {
        //window.location = '/';
      })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval);

  }, [refreshToken, expiresIn])

  return accessToken;
}

export default useAuth;