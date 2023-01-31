import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
// import axios from 'axios';

import { loginAPI } from '../../../api/UserAuthAPI';

const kDefaultFormState = {
  username: "",
  password: "",
};
// const kBaseUrl = process.env.REACT_APP_BE_URL;

const LoginForm = () => {

  // const [csrfToken, setCsrfToken] = useState(null);

  // useEffect(() => {
  //   axios.get(`${kBaseUrl}/csrf`)
  //     .then(response => {
  //       setCsrfToken(response.data.csrfToken);
  //     });
  // }, []);

    const [formData, setFormData] = useState(kDefaultFormState);
  
    const handleChange = (event) => {
      const fieldValue = event.target.value;
      const fieldName = event.target.name;
      const newFormData = { ...formData, [fieldName]: fieldValue };
  
      setFormData(newFormData);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      loginAPI(formData);
      setFormData(kDefaultFormState);
    };

  return (
    <div>
      <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formUsername">          
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit'>Log In</Button>

      </Form>
    </div>

  )
};

export default LoginForm;