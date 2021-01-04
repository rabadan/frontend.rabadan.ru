import RequestsService from '../services/RequestsService';
import {TError} from "../interfaces/IError";
import {IOauthParams, TAuthResponse} from "../interfaces/IUser";

const API_URL = process.env.REACT_APP_API_URL;

async function sign_in(email: string, password: string) {
  const url = `${API_URL}api/v1/login`;
  const params = { 'user': { email, password }};

  return RequestsService.post<TAuthResponse>(url, params)
    .then((response: TAuthResponse) => {
      return response.jwt
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function sign_up(name: string, email: string, password: string) {
  const url = `${API_URL}api/v1/users`;
  const params = { 'user': { name, email, password }};

  return RequestsService.post<TAuthResponse>(url, params)
    .then((response: TAuthResponse) => {
      return response.jwt
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function sign_in_oauth(data: IOauthParams) {
  const url = `${API_URL}/api/v1/login_oauth`;

  return RequestsService.post<TAuthResponse>(url, data)
    .then((response: TAuthResponse) => {
      return response.jwt
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { sign_in, sign_up, sign_in_oauth };

export default requests
