import Button from 'react-bootstrap/Button';
import { logoutAPI } from '../api/UserAuthAPI';
import { useAuthContext } from '../hooks/useAuthContext.js';

const LogoutButton = () => {
  const { authLogout } = useAuthContext();

  const handleLogout = async () => {
    const response = await logoutAPI();
    // console.log(response);
    if (response.data.success) {
      authLogout();
    } else {
      console.log('error logging out & resetting state in front end');
    }
  };

  return <Button onClick={handleLogout}>Log out</Button>;
};

export default LogoutButton;
