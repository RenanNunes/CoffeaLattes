import fetchIntercept from 'fetch-intercept';
import { vue } from '../main';

export const interceptRegister = fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    if (config && config.headers && vue.$cookies.token){
      config.headers.token = vue.$cookies.token;
    }
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function (response) {
    // Modify the reponse object
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error);
  }
});