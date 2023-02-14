// this component is not being used - for development only

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie'

// const kBaseUrl = process.env.REACT_APP_BE_URL;

// const CSRFToken = () => {
//     const [csrftoken, setcsrftoken] = useState('');

//     const getCookie = (name) => {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             let cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 let cookie = cookies[i].trim();
//                 if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await axios.get(`${kBaseUrl}/csrf`);
//                 console.log(`cookies.get token after useffect in CSRF token ${Cookies.get('csrftoken')}`);
//             } catch (err) {

//             }
//         };

//         fetchData();
//         setcsrftoken(getCookie('csrftoken'));
//         console.log(`getCookie token after useffect in CSRF token ${getCookie('csrftoken')}}`);

//     }, []);

//     return (
//         <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
//     );
// };

// export default CSRFToken;