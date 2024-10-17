import axios from 'axios';

// const URL = 'https://demo.gedagro.com.br/api/'
const URL = 'https://api.gedagro.com.br/'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : URL
});

export const api_url = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_BASE_URL
  : URL



