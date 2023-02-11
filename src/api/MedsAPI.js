import axios from 'axios';
import Cookies from 'js-cookie';

const kBaseUrl = process.env.REACT_APP_BE_URL;

//GET MEDS 
export const getMedsApi = async (isPrescription) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    const response = await axios.get(`${kBaseUrl}/medications/?is_prescription=${isPrescription}`, config)

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

  const body = JSON.stringify({...medData, med_name: medData.name, is_prescription: medData.isPrescription, user: userId});  

  try {
    const response = await axios.post(`${kBaseUrl}/medications/`,body, config)

    if (response.status === 201) {
      console.log('med posted!')
    }

    } catch (err) {
    console.log(`failure posting med: ${err}`)
  }
};