import {useRef, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEbay } from '@fortawesome/free-brands-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './styles/AlbumBox.css';

function AlbumBox({title, artist, imgLink, ebayPrice, ebayLink, amazonPrice, amazonLink, targetPrice, targetLink, albumSpotifyUri, setAlbumSpotifyUri})  {

  const ebayRef = useRef();
  const amazonRef = useRef();
  const targetRef = useRef();
  const albumRef = useRef();

  useEffect(() => {
    if(noLinks())  {
      return;
    }
    albumRef.current.addEventListener('click', () => {
     setAlbumSpotifyUri(albumSpotifyUri);
     console.log(albumSpotifyUri);
    })
  }, []);

  useEffect(() => {
    if(ebayLink == 'null') {
      return;
    }
    ebayRef.current.addEventListener('click', () => {
      window.open(ebayLink, '_blank').focus();
    })
  }, [ebayRef]);

  useEffect(() => {
    if(amazonLink == 'null') {
      return;
    }
    amazonRef.current.addEventListener('click', () => {
      window.open(amazonLink, '_blank').focus();
    })
  }, [amazonRef]);

  useEffect(() => {
    if(targetLink == 'null') {
      return;
    }
    targetRef.current.addEventListener('click', () => {
      window.open(targetLink, '_blank').focus();
    })
  }, [targetRef]);

  function noLinks()  {
    return (ebayLink == 'null' && amazonLink == 'null' && targetLink == 'null');
  }

  return(
    <>
    {!noLinks() &&
      <div className="album-box-container">
        <img className="album-cover" src={imgLink} ref = {albumRef} />
        <div className="album-text">
          <p className="album-title">{title}</p>
          <p className="album-artist">{artist}</p>
        </div>
        <div className="product-links-container">
          {( ebayPrice != 'null' && ebayLink != 'null' ) &&
            <p className="product-link" ref = {ebayRef}><FontAwesomeIcon className="store-icon" icon={faEbay} /> {ebayPrice}</p>
          }
          {( amazonPrice != 'null' && amazonLink != 'null' ) &&
            <p className="product-link" ref = {amazonRef}><FontAwesomeIcon className="store-icon" icon={faAmazon} /> {amazonPrice}</p>
          }
          {( targetPrice != 'null' && targetLink != 'null' ) &&
            <p className="product-link" ref = {targetRef}><FontAwesomeIcon className="store-icon" icon={faBullseye} /> {targetPrice}</p>
          }
        </div>
      </div>
    }
    </>
  )
}

export default AlbumBox;