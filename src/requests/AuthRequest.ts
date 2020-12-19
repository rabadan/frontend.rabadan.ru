import RequestsService from '../services/RequestsService';
import User from "../entities/User";
import {TError} from "../interfaces/IError";
import {IOauthParams, TUserResponse} from "../interfaces/IUser";

const API_URL = process.env.REACT_APP_API_URL;

async function sign_in(email: string, password: string) {
  const url = `${API_URL}signin`;
  const params = { email, password };

  return RequestsService.post<TUserResponse>(url, params)
    .then((response: TUserResponse) => {
      return new User(response);
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function sign_up(email: string, password: string) {
  const url = `${API_URL}signup`;
  const params = { email, password };

  return RequestsService.post<TUserResponse>(url, params)
    .then((response: TUserResponse) => {
      return new User(response);
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function sign_in_oauth(data: IOauthParams) {
  const url = `${API_URL}signin_oauth`;

  return RequestsService.post<TUserResponse>(url, data)
    .then((response: TUserResponse) => {
      return new User(response);
    })
    .catch((error: TError) => {
      throw error;
    });
}

export default { sign_in, sign_up, sign_in_oauth };
