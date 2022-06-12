import axios from 'axios';

export default function setAuthorizationToken(token: string) {
  if (token) {
    axios.defaults.headers.common['auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['auth-token'];
  }
}