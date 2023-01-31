import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const kBaseUrl = process.env.REACT_APP_BE_URL;

export const loginAPI = async ({username, password}) => {

  const body = JSON.stringify({username, password})

  const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  console.log(username)
  console.log(password)

  try {
    const response = await axios.post(`${kBaseUrl}/login`, body, config)

    if (response.data.success) {
      console.log('logged in!!!')
    }

  } catch (err) {
    console.log(`LOGIN 👹 FAIL: ${err}`)
  }
};

