import LoginForm from './components/LoginForm'
import LogoutButton from '../../misc_components/LogoutButton'
import HomeButton from '../../misc_components/HomeButton'
import './Login.css'


const Login = () =>   {
  return (
    <div>
      <LoginForm />
      <LogoutButton />
      <HomeButton />
    </div>
  );
      
};


export default Login;