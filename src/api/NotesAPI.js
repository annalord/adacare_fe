import axios from 'axios';
import Cookies from 'js-cookie';
// import { useState, useEffect } from 'react';

const kBaseUrl = process.env.REACT_APP_BE_URL;

//GET ALL NOTES 
export const getNotesApi = async () => {

  const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  try {
    // console.log(Cookies.get('csrftoken'))
    const response = await axios.get(`${kBaseUrl}/notes`, config)

    if (response.data.success) {
      console.log('notes retrieved!')
      console.log(response)
      // console.log(Cookies.get('csrftoken'))
    }

    } catch (err) {
    console.log(`failure getting notes: ${err}`)
  }
};


//POST A NEW NOTE
export const postNotesApi = async (noteData) => {

  const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  const body = JSON.stringify(noteData);

  try {
    // console.log(Cookies.get('csrftoken'))
    const response = await axios.post(`${kBaseUrl}/notes/`,body, config)

    if (response.data.success) {
      console.log('note posted!')
    }

    } catch (err) {
    console.log(`failure posting note: ${err}`)
  }
};




