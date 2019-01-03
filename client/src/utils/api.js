import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function getToken() {
  return localStorage.getItem('jwtToken');
}

export default axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${getToken()}` }
});
