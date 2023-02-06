import LoginForm from './components/LoginForm'
import LogoutButton from '../../misc_components/LogoutButton'
import HomeButton from '../../misc_components/HomeButton'
import './Login.css'
// import CSRFToken from '../../misc_components/CSRFToken'


const Login = () =>   {
  return (
    <div>

      {/* <CSRFToken></CSRFToken> */}
      <LoginForm />
      <LogoutButton />
      <HomeButton />
    </div>
  );
      
};


export default Login;