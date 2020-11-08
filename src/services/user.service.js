import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'api/v1/home/index');
  }

  getUserBoard() {
    return axios.get(API_URL + 'api/v1/users/show', { headers: authHeader() });
  }
}

export default new UserService();
