import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_BASE_URL
        : 'https://demo.gedagro.com.br/api/'
});