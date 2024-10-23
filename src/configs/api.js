import axios from 'axios';

const URL = 'https://app.gedagro.com.br/api/'

//* UPLOAD PHP (develop || production)
export const URL_UPLOAD = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/Gedagro/'
  : 'https://gedagro.com.br/apps/ged/production/'

export const BACKEND_FOLDER = process.env.NODE_ENV === 'development'
  ? 'GED-BACK' : 'backend'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : URL
});

export const api_url = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_BASE_URL
  : URL
