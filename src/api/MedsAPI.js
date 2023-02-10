import axios from 'axios';
import Cookies from 'js-cookie';

const kBaseUrl = process.env.REACT_APP_BE_URL;

//GET ALL MEDS 
export const getMedsApi = async () => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    const response = await axios.get(`${kBaseUrl}/medications`, config)

    if (response.status === 200) {
      console.log('meds retrieved!')
      return response.data
    }

    } catch (err) {
    console.log(`failure getting meds: ${err}`)
  }
};


//POST A NEW MED
export const postMedApi = async (medData, userId) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  const body = JSON.stringify({...medData, user: userId});  

  try {
    const response = await axios.post(`${kBaseUrl}/medications/`,body, config)

    if (response.status === 201) {
      console.log('med posted!')
    }

    } catch (err) {
    console.log(`failure posting med: ${err}`)
  }
};