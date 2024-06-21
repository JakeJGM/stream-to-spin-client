import './styles/StreamToSpin.css';
import logo from '../images/StreamToSpin_V4.png';

function StreamToSpin({size})  {

  return(
    <>
      <img className="logo" src={logo} alt="Stream To Spin Logo" width={size}/>
    </>
  )
}

export default StreamToSpin;