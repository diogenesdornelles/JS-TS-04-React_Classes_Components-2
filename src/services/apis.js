import axios from 'axios';
import env from 'react-dotenv';

const headers = {
  Authorization: `Bearer ${env.API_PEXELS_KEY}`
};

const apis = (url = '', parameter = '') => {
  return {
    advice: axios.create({
      baseURL: url + parameter
    }),
    photos: axios.create({
      baseURL: url + parameter
    }),
    users: axios.create({
      baseURL: url + parameter
    }),
    pexels: axios.create({
      baseURL: url + parameter,
      headers
    })
  };
};

export default apis;
