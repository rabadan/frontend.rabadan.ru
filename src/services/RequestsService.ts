import HttpClientBuilder from './HttpClientBuilder';
import Error from '../entities/Error';
import {TErrorResponse} from "../interfaces/IError";

const get = <TResponse>(url: string, params?: any) => {
  const client = HttpClientBuilder.fetchClient();

  return client
    .get<{ data: TResponse; errors?: TErrorResponse }>(url, params)
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      throw Error.parseResponse(error);
    });
};

const post = <TResponse>(url: string, params?: any) => {
  const client = HttpClientBuilder.fetchClient();

  return client
    .post<{ data: TResponse; errors?: TErrorResponse }>(url, params)
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      throw Error.parseResponse(error);
    });
};

export default {
  get,
  post
};
