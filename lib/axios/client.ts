'use client';

import type {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import axios from 'axios';

import {getAuthApiURL, getS3ApiURL} from '../get-server-url';
import {getAccessToken} from '../get-access-token';

const AUTH_API: AxiosInstance = axios.create({
  baseURL: getAuthApiURL(),
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const S3_API: AxiosInstance = axios.create({
  baseURL: getS3ApiURL(),
  responseType: 'json',
  withCredentials: true,
  headers: {},
});

const requestInterceptor = async (config: AxiosRequestConfig): Promise<any> => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
};

const requestErrorInterceptor = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

AUTH_API.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
S3_API.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

export {AUTH_API, S3_API};
