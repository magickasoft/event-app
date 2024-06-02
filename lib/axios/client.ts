'use client';

import type {AxiosInstance} from 'axios';
import axios from 'axios';

import {getServerURL} from '../get-server-url';

const API: AxiosInstance = axios.create({
  baseURL: getServerURL(),
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export {API};
