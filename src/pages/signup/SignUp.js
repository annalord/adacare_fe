import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SignUp.css';
import { signUpAPI } from '../../api/UserAuthAPI';

const kDefaultFormState = {
  firstName: '',
  username: '',
  password: '',
  pwRepeat: ''
};

const SignUp = () => {

  const navigate = useNavigate();
  const goToLogin = () => {
    return navigate('/login');
  };

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await signUpAPI(formData);
    setFormData(kDefaultFormState);

    if (response.data.success) {
      goToLogin();
    }
  };

  return (
    <div>
      <div>
      <Form onSubmit={handleSubmit}>
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
            type='text'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPwRepeat'>
          <Form.Label className='label'>Repeat password</Form.Label>
          <Form.Control
            type='text'
            name='pwRepeat'
            value={formData.pwRepeat}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit'>Sign up</Button>
      </Form>
    </div>

      <Button onClick={goToLogin}> Have an account? Log in </Button>
    </div>
  );
};

export default SignUp;