import HttpClientBuilder from './HttpClientBuilder';
import Error from '../entities/Error';

const get = <TResponse>(url: string, params?: any) => {
  const client = HttpClientBuilder.fetchClient();
  return client
    .get<TResponse>(url, params)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw Error.parseResponse(error);
    });
};

const post = <TResponse>(url: string, params?: any) => {
  const client = HttpClientBuilder.fetchClient();

  return client
    .post<TResponse>(url, params)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw Error.parseResponse(error);
    });
};

const put = <TResponse>(url: string, params?: any, config?: any) => {
  const client = HttpClientBuilder.fetchClient();

  return client
    .put<TResponse>(url, params, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw Error.parseResponse(error);
    });
};

const list = {
  get,
  post,
  put
};
export default list;
