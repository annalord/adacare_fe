import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import './Login.css';
// import CSRFToken from '../../misc_components/CSRFToken';

const Login = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    return navigate('/signup');
  };

  return (
    <div>
      {/* <CSRFToken></CSRFToken> */}
      <LoginForm />
      <Button onClick={goToSignUp}> Dont have an account? Sign up </Button>
    </div>
  );
};

export default Login;
