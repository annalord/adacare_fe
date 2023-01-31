import { logoutAPI } from '../api/UserAuthAPI';
import Button  from 'react-bootstrap/Button'


const handleLogout = () => {
  logoutAPI();
  //redirect to Login page 
}

const LogoutButton = () => {

  return (
    <Button onClick={handleLogout}>Log out</Button>
  )
};

export default LogoutButton;