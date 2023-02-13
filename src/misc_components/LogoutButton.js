import Button from 'react-bootstrap/Button';
import { logoutAPI } from '../api/UserAuthAPI';
import { useAuthContext } from '../hooks/useAuthContext.js';
import './LogoutButton.css';

const LogoutButton = () => {
  const { authLogout } = useAuthContext();

  const handleLogout = async () => {
    const response = await logoutAPI();
    if (response.data.success) {
      authLogout();
    } else {
      console.log('error logging out & resetting state in front end');
    }
  };

  return <Button onClick={handleLogout} id='logout-button'>Log out</Button>;
};

export default LogoutButton;
