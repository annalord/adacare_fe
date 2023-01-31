// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
// import axios from 'axios';

import { loginAPI } from '../../../api/UserAuthAPI';

const kDefaultFormState = {
  username: "",
  password: "",
};
const kBaseUrl = process.env.REACT_APP_BE_URL;

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button id="submit">Log In</button>
      </form>
    </div>

  )
};

export default LoginForm;