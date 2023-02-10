import axios from 'axios';
import Cookies from 'js-cookie';

const kBaseUrl = process.env.REACT_APP_BE_URL;

//GET ALL EVENTS 
export const getEventsApi = async () => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    const response = await axios.get(`${kBaseUrl}/events`, config)

    if (response.status === 200) {
      console.log('events retrieved!')
      return response.data
    }

    } catch (err) {
    console.log(`failure getting events: ${err}`)
  }
};

//GET EVENTS FOR TODAY 
export const getTodaysEventsApi = async (todaysDate) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    const response = await axios.get(`${kBaseUrl}/events/?start_date=${todaysDate}`, config)

    if (response.status === 200) {
      console.log(`events for ${todaysDate} retrieved!`)
      return response.data
    }

    } catch (err) {
    console.log(`failure getting today's events: ${err}`)
  }
};


//POST A NEW EVENT
export const postEventApi = async (eventData, userId) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  const body = JSON.stringify({...eventData, user: userId}); 
  try {
    const response = await axios.post(`${kBaseUrl}/events/`,body, config)

    if (response.status === 201) {
      console.log('event posted!')
    }

    } catch (err) {
    console.log(`failure posting event: ${err}`)
  }
};


// MARK AN EVENT COMPLETE
export const patchCompleteEventApi = async (id, bool) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  const body = JSON.stringify({completed: bool}); 


  try {
    const response = await axios.patch(`${kBaseUrl}/events/${id}/`, body, config)

    if (response.status === 200) {
      console.log('event completed updated!')
    }

    } catch (err) {
    console.log(`failure updating event completed: ${err}`)
  }
};



