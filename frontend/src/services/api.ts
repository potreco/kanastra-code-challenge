import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // O servidor retornou um código de status fora do intervalo de 2xx
      console.error('Request error:', error.response.data);
    } else if (error.request) {
      // A solicitação foi feita, mas não houve resposta
      console.error('Request error:', error.request);
    } else {
      // Ocorreu um erro ao configurar a solicitação
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
