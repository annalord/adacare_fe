import bird from '../littlebird-nobg.png';
import './AdaCareBanner.css';

const AdaCareBanner = () => {
  return (
    <div id='banner' className='col-12'>
      <img src={bird} alt='cardinal drawing' id='bird'></img>
      <h1 id='banner-h1'>AdaCare</h1>
      <img src={bird} alt='cardinal drawing' id='bird'></img>
    </div>
  );
};

export default AdaCareBanner;
