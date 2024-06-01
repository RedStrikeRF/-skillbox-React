import axios from 'axios';

const API_URL = 'https://reqres.in/api/';

const apiService = axios.create({
  baseURL: API_URL
});

export default apiService;
