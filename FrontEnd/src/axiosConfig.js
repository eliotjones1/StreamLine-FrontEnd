import axios from 'axios';

const createAxiosInstance = (cacheConfig = {}) => {
  const instance = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (cacheConfig.enabled) {
    instance.defaults.headers['Cache-Control'] = cacheConfig.cacheControl || 'no-cache';
    instance.defaults.headers['Pragma'] = cacheConfig.pragma || 'no-cache';
    instance.defaults.headers['Expires'] = cacheConfig.expires || '0';
  }

  return instance;
};

export const axiosNoCache =  createAxiosInstance();

export const axiosWithCache = createAxiosInstance({
  enabled: true,
  cacheControl: 'max-age=3600',
  pragma: 'public',
  expires: '3600',
});
