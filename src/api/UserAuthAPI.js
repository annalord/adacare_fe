import axios from 'axios';
import Cookies from 'js-cookie';
// import { useState, useEffect } from 'react';

const kBaseUrl = process.env.REACT_APP_BE_URL;

export const loginAPI = async ({ username, password }) => {
  const body = JSON.stringify({ username, password });
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  };

  try {
    console.log(`token before login ${Cookies.get('csrftoken')}`);
    const response = await axios.post(`${kBaseUrl}/login`, body, config);

    if (response.data.success) {
      console.log(`token after login ${Cookies.get('csrftoken')}`);
      console.log('login success')
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
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    console.log(`logout token: ${Cookies.get('csrftoken')}`);
    const response = await axios.post(`${kBaseUrl}/logout`, body, config);

    if (response.data.success) {
      console.log('logged out');
    }
  } catch (err) {
    console.log(`LOGOUT  FAIL: ${err}`);
    // console.log(err)
  }
};

// const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

// export const login = (username, password) => {
//     return axios.post('/api/login/', {
//         username,
//         password
//     });
// };

// export const logout = () => {
//     return axios.post('/api/logout/');
// };
