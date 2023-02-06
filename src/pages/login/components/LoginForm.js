import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginAPI } from '../../../api/UserAuthAPI';
import { UserContext  } from '../../../index.js'

const kDefaultFormState = {
  username: "",
  password: "",
};

const LoginForm = () => {

    const [userState, setUserState] = useContext(UserContext);
    const [formData, setFormData] = useState(kDefaultFormState);
  
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
      console.log(response)
      
      if (response.status === 200) {
        setUserState({
          isLoggedIn: true,
          name: response.data.user_name,
          id: response.data.user_id,
        })
      }
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