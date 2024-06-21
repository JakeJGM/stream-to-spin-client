import './styles/Phone.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faShuffle, faMusic } from '@fortawesome/free-solid-svg-icons';

function Phone()  {
  return (
    <>
      <div className="phone">
        <div className="rim">
          <div className="screen">
            <div className="bezel"></div>
            <div className="playlist-cover"></div>
            <div className="playlist-buttons">
              <div className="play-button"><FontAwesomeIcon icon={faPlay} /></div>
              <div className="shuffle-button"><FontAwesomeIcon icon={faShuffle} /></div>
            </div>
            <div className="song-list">
              <div className="song-desc">
                <FontAwesomeIcon icon={faMusic}/>
                <div className="song-name"></div>
              </div>
              <div className="song-desc">
                <FontAwesomeIcon icon={faMusic}/>
                <div className="song-name"></div>
              </div>
              <div className="song-desc">
                <FontAwesomeIcon icon={faMusic}/>
                <div className="song-name"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Phone;