import axios from 'axios';
import Cookies from 'js-cookie';
// import { useState, useEffect } from 'react';

const kBaseUrl = process.env.REACT_APP_BE_URL;

//GET ALL NOTES 
export const getNotesApi = async () => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    const response = await axios.get(`${kBaseUrl}/notes`, config)

    if (response.status === 200) {
      console.log('notes retrieved!')
      return response.data
    }

    } catch (err) {
    console.log(`failure getting notes: ${err}`)
  }
};


//POST A NEW NOTE
export const postNotesApi = async (noteData) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  const body = JSON.stringify({...noteData, user: 1});  /// dont leave user hardcoded!!!

  try {
    const response = await axios.post(`${kBaseUrl}/notes/`,body, config)

    if (response.data.success) {
      console.log('note posted!')
    }

    } catch (err) {
    console.log(`failure posting note: ${err}`)
  }
};




