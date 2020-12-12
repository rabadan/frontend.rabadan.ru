import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default class HttpClientBuilder {
  static fetchClient() {
    return axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
}
