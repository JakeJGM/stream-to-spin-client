import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './styles/RecordPlayer.css';

function RecordPlayer({zoom, play})  {
  const myHeadshell = useRef(null);

  return (
    <>
      <div style={{"zoom" : `${zoom}`}}>
        <div className="record-player">
          <input type="checkbox" id="headshell" ref={myHeadshell} defaultChecked={play}/>
          <label className="headshell" htmlFor="headshell"></label>      
          <div className="plinth"></div>
          <div className="platter"></div>
          <div className="vinyl"></div>
          <div className="top-circle"></div>
        </div>
      </div>
    </>
  )
}

export default RecordPlayer;