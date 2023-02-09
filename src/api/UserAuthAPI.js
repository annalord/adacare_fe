import axios from 'axios';
import Cookies from 'js-cookie';


const kBaseUrl = process.env.REACT_APP_BE_URL;

export const signUpAPI = async ({ username, password, pwRepeat:pw_repeat, firstName:first_name }) => {

  const body = JSON.stringify({ username, password, pw_repeat, first_name, withCredentials: true});
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  }

  try {
    const response = await axios.post(`${kBaseUrl}/signup`, body, config);

    if (response.data.success) {
      console.log('sign up success')
    } else {
      console.log('username taken or PW do not match')
    }
    return response;

  } catch (err) {
    console.log(`SIGN UP FAIL: ${err}`);
  } 
  
};

export const loginAPI = async ({ username, password }) => {

  // const csrfResponse = await axios.get(`${kBaseUrl}/csrf`)

  const body = JSON.stringify({ username, password, withCredentials: true});
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  }

  try {
    console.log(`token before login with cookies.get ${Cookies.get('csrftoken')}`);
    // console.log(`token before login with csrfResponse ${csrfResponse.data.csrfToken}`);
    const response = await axios.post(`${kBaseUrl}/login`, body, config);

    if (response.data.success) {
      console.log(`token after login with cookies.get ${Cookies.get('csrftoken')}`);
      console.log('login success')
      return response
    }
  } catch (err) {
    console.log(`LOGIN FAIL: ${err}`);
  }
};

export const logoutAPI = async () => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    console.log(`logout token: ${Cookies.get('csrftoken')}`);
    const response = await axios.post(`${kBaseUrl}/logout`, config);

    if (response.data.success) {
      console.log('logged out');
      return response
    }
  } catch (err) {
    console.log(`LOGOUT  FAIL: ${err}`);
  }
};

