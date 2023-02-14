import axios from 'axios';
import Cookies from 'js-cookie';

const kBaseUrl = process.env.REACT_APP_BE_URL;
const getUserLsToken = () => {
  return JSON.parse(window.localStorage.getItem('user')).token;
};

//GET ALL NOTES
export const getNotesApi = async () => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      Authorization: `Token ${getUserLsToken()}`,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${kBaseUrl}/notes`, config);

    if (response.status === 200) {
      console.log('notes retrieved!');
      return response.data;
    }
  } catch (err) {
    console.log(`failure getting notes: ${err}`);
  }
};

//POST A NEW NOTE
export const postNotesApi = async (noteData, userId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      Authorization: `Token ${getUserLsToken()}`,
    },
    withCredentials: true,
  };

  const body = JSON.stringify({ ...noteData, user: userId });

  try {
    const response = await axios.post(`${kBaseUrl}/notes/`, body, config);

    if (response.status === 201) {
      console.log('note posted!');
    }
  } catch (err) {
    console.log(`failure posting note: ${err}`);
  }
};
