import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './styles/Header.css';

function Header()  {
  const urlParams = new URLSearchParams(window.location.search);

  function switchRoute(e)  {
    if(window.location.pathname !== '/home')  {
      e.preventDefault();
      window.location.href = '/home?q=' + document.getElementById("query").value;
    }
  }

  return (
    <>
      <nav className="header-container">
        <Link className="home-nav" to="/home"  onClick={() => (urlParams.get('q') !== null) && (window.location.href = '/home')}>Home</Link>
        <Link className="recommended-nav" to="/picks">Our Picks</Link>
        <form className="search-form" id="form" onSubmit={ switchRoute }> 
          <input className="search-bar" type="search" id="query" name="q" placeholder="Search for more records..."/>
          <button className="search-button"><FontAwesomeIcon className="search-icon" icon={faCompactDisc} /></button>
        </form>
      </nav>
      <p className="disclosure-text">This site contains affiliate links for which I may be compensated</p>
    </>
  )
}

export default Header;