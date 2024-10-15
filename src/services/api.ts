import axios from 'axios';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTUzOWY3Y2RiOTlmYjM3NDc5NGJiZTQ1MTYyYTg1MSIsIm5iZiI6MTcyODIyMDg5Ni41MDMwODksInN1YiI6IjY3MDI4YmU3NjdjNmZiMDlmZmY4N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iiKPdXfxYfOAQbn1pRjr8qCrClgjf2Bs5NrNx1fkeLs';
export const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
});

export default apiClient;
