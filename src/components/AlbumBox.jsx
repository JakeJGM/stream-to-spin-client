import {useRef, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEbay } from '@fortawesome/free-brands-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
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
        <img className="album-cover" src={imgLink} ref={albumRef} />
        <div className="album-text">
          <p className="album-title">{title}</p>
          <p className="album-artist">{artist}</p>
        </div>
        <div className="product-links-container">
          {( ebayPrice != 'null' && ebayLink != 'null' ) &&
            <div className="product-link">
            <div className="store-info-container">
              <FontAwesomeIcon className="store-icon" icon={faEbay} /> 
              <p>&nbsp;Ebay</p>
            </div>
            <div className="price-buy-container">
              <p>{ebayPrice} &nbsp;</p> 
              <button className="buy-button" ref={ebayRef}>
                Buy <FontAwesomeIcon className="buy-icon" icon={faArrowUpRightFromSquare} />
              </button>
            </div>
          </div>
          }
          {( amazonPrice != 'null' && amazonLink != 'null' ) &&
            <div className="product-link">
              <div className="store-info-container">
                <FontAwesomeIcon className="store-icon" icon={faAmazon} /> 
                <p>&nbsp;Amazon</p>
              </div>
              <div className="price-buy-container">
                <p>{amazonPrice} &nbsp;</p> 
                <button className="buy-button" ref = {amazonRef}>
                  Buy <FontAwesomeIcon className="buy-icon" icon={faArrowUpRightFromSquare} />
                </button>
              </div>
            </div>
          }
          {( targetPrice != 'null' && targetLink != 'null' ) &&
            <div className="product-link">
            <div className="store-info-container">
              <FontAwesomeIcon className="store-icon" icon={faBullseye} /> 
              <p>&nbsp;Target</p>
            </div>
            <div className="price-buy-container">
              <p>{targetPrice} &nbsp;</p> 
              <button className="buy-button" ref={targetRef}>
                Buy <FontAwesomeIcon className="buy-icon" icon={faArrowUpRightFromSquare} />
              </button>
            </div>
          </div>
          }
        </div>
      </div>
    }
    </>
  )
}

export default AlbumBox;