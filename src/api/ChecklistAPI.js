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

  try {
    const response = await axios.delete(`${kBaseUrl}/dailytasks/${id}`, config)

    if (response.status === 202) {
      console.log('task deleted!')
    }

    } catch (err) {
    console.log(`failure deleting task: ${err}`)
  }
};


// POST A NEW TASK
export const postTaskApi = async (taskData, userId) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  const body = JSON.stringify({...taskData, user: userId});  /// dont leave user hardcoded!!!

  try {
    const response = await axios.post(`${kBaseUrl}/dailytasks/`,body, config)

    if (response.status === 201) {
      console.log('task posted!')
    }

    } catch (err) {
    console.log(`failure posting task: ${err}`)
  }
};

// MARK A TASK COMPLETE
export const patchCompleteTaskApi = async (id, bool) => {

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
    const response = await axios.patch(`${kBaseUrl}/dailytasks/${id}/`, body, config)

    if (response.status === 200) {
      console.log('task completed updated!')
    }

    } catch (err) {
    console.log(`failure updating task completed: ${err}`)
  }
};

//RESET ALL TASKS TO completed=false
export const patchSetTaskIncomplete = async (id) => {

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    withCredentials: true
  };

  const body = JSON.stringify({completed: false}); 

  try {
    const response = await axios.patch(`${kBaseUrl}/dailytasks/${id}/`, body, config)

    if (response.status === 200) {
      console.log('task reset at midnight!')
    }

    } catch (err) {
    console.log(`failure resetting task at midnight: ${err}`)
  }
};



