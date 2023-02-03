import bird from '../littlebird.png';
import './AdaCareBanner.css';

const AdaCareBanner = () => {
  return (
    <div id='banner' className='mb-3 col-12'>
      <img src={bird} alt='cardinal drawing' id='bird'></img>
      <h1 id='banner-h1'>AdaCare</h1>
      <img src={bird} alt='cardinal drawing' id='bird'></img>
    </div>
  );
};

export default AdaCareBanner;
