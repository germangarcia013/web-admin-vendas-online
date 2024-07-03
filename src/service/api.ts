import axios from 'axios';

export default axios.create({
  baseURL: 'https://backend-vendas-online.onrender.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
