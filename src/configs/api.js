import axios from 'axios';

const URL = 'https://demo.gedagro.com.br/api/'

export const api = axios.create({
<<<<<<< HEAD
    baseURL: process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_BASE_URL
        : 'https://app.gedagro.com.br/api/'
});
=======
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : URL
});

export const api_url = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_BASE_URL
  : URL
>>>>>>> 404ef1ac69ea77a7a58d23eafb664f4abf3777e1
