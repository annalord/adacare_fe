import { useContext } from 'react';
import { logoutAPI } from '../api/UserAuthAPI';
import Button  from 'react-bootstrap/Button'
import { UserContext  } from '../index.js'



const LogoutButton = () => {

  const [userState, setUserState] = useContext(UserContext);

  const handleLogout = async () => {
    const response = await logoutAPI();
    console.log(response)
    if (response.data.success) {
      setUserState({
        isLoggedIn: false,
        name: null,
        id: null,
      })
      // console.log(`userState after logout: ${userState}`)
    } else {
      console.log('error logging out & resetting state in front end')
    }
      //redirect to Login page 
  };

  return (
    <Button onClick={handleLogout}>Log out</Button>
  )
};

export default LogoutButton;