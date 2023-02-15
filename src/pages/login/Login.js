import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container';
import LoginForm from './components/LoginForm';
import './Login.css';
import AdaCareBanner from '../../misc_components/AdaCareBanner'

const Login = () => {

  return (
    <div id='login-container'>
      <Container fluid className='vh-100'>

        <Row>
          <AdaCareBanner/>
        </Row>

        <Row className='d-flex justify-content-center mt-5 mb-3'>
          <LoginForm/>
        </Row>

        <Row id='signup-row'>
          <p>Don't have an account? &nbsp;</p>
          <a href='/signup' id='signup-link'>Sign up</a>
        </Row>

        </Container>
    </div>
  );
};

export default Login;
