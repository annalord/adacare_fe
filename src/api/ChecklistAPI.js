import axios from 'axios';
import Cookies from 'js-cookie';

const kBaseUrl = process.env.REACT_APP_BE_URL;

//GET ALL TASKS 
export const getChecklistApi = async () => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  try {
    const response = await axios.get(`${kBaseUrl}/dailytasks`, config)

    if (response.status === 200) {
      console.log('checklist tasks retrieved!')
      return response.data
    }

    } catch (err) {
    console.log(`failure getting checklist tasks: ${err}`)
  }
};

// DELETE A TASK
export const deleteTaskApi = async (id) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  // const body = JSON.stringify({...eventData, user: 5});  /// dont leave user hardcoded!!!

  try {
    const response = await axios.delete(`${kBaseUrl}/dailytasks/${id}`, config)

    if (response.status === 202) {
      console.log('task deleted!')
    }

    } catch (err) {
    console.log(`failure deleting task: ${err}`)
  }
};




