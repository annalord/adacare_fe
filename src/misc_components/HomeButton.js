import Button  from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {

  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home')
  }

  return (
    <Button onClick={handleHome}>Home</Button>
  )
};

export default HomeButton;