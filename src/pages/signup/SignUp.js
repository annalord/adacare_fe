import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SignUp.css';
import { signUpAPI } from '../../api/UserAuthAPI';
import AdaCareBanner from '../../misc_components/AdaCareBanner'

const kDefaultFormState = {
  firstName: '',
  username: '',
  password: '',
  pwRepeat: ''
};

const usernameError = () => {
  return (
    <p className='signup-error-message'>That username is already taken.</p>
  );
};

const pwMismatchError = () => {
  return (
    <p className='signup-error-message'>Passwords do not match.</p>
  );
};


const SignUp = () => {

  const navigate = useNavigate();
  const goToLogin = () => {
    return navigate('/login');
  };

  const [formData, setFormData] = useState(kDefaultFormState);
  const [signupStatus, setSignupStatus] = useState( {usernameTaken: false, pwMismatch: false})


  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setSignupStatus({usernameTaken: false, pwMismatch: false})

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await signUpAPI(formData);
    setFormData(kDefaultFormState);

    if (response.data.success) {
      goToLogin();
    } else if (response.data.username_error) {
      setSignupStatus({...signupStatus, usernameTaken: true})
    } else if (response.data.password_error) {
      setSignupStatus({...signupStatus, pwMismatch: true})
    }
  };

  return (
    <div id='signup-container'>
      <Container fluid className='vh-100'>

        <Row>
          <AdaCareBanner/>
        </Row>

        <Row className='d-flex justify-content-center mt-1 mb-3'>
          <Form onSubmit={handleSubmit} id='signup-form'>
            <p id='create-acct-txt'>Create an account</p>
            <Form.Group className='mb-3' controlId='formFirstName'>
              <Form.Label className='label'>First name</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formUsername'>
              {signupStatus.usernameTaken && usernameError()}
              <Form.Label className='label'>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className='mb-3' controlId='formPwRepeat'>
              {signupStatus.pwMismatch && pwMismatchError()}
              <Form.Label className='label'>Repeat password</Form.Label>
              <Form.Control
                type='password'
                name='pwRepeat'
                value={formData.pwRepeat}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className='text-center'>
              <Button type='submit' id='signup-button'>Sign up</Button>
            </div>
          </Form>
        </Row>
        
        <Row id='login-row'>
          <p>Have an account? &nbsp;</p>
          <a href='/login' id='login-link'>Log in</a>
        </Row>

      </Container>
    </div>
  );
};

export default SignUp;