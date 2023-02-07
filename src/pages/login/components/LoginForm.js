import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginAPI } from '../../../api/UserAuthAPI';
import { useAuthContext } from '../../../hooks/useAuthContext.js';
import './LoginForm.css'

const kDefaultFormState = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const { authLogin } = useAuthContext();

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginAPI(formData);
    setFormData(kDefaultFormState);
    // console.log(response);

    if (response.status === 200) {
      // console.log(`in loginform handlesubmit if statement`);
      authLogin({
        isLoggedIn: true,
        name: response.data.user_name,
        id: response.data.user_id,
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} id='login-form'>
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

        <div className='text-center'>
          <Button type='submit' id='login-button'>Log in</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
