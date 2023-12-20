import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://api.tvmaze.com/search/shows?q='
});

export default axiosApi;