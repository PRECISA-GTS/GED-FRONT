import axios from 'axios';

const URL = 'https://app.gedagro.com.br/api/'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : URL
});

export const api_url = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_BASE_URL
  : URL
