import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
  const url = `${API_URL}api/v1/home/index`;
  const params = { headers: authHeader() };

  return RequestsService.get<any>(url, params)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function show() {
  const url = `${API_URL}api/v1/users/show`;
  const params = { headers: authHeader() };

  return RequestsService.get<any>(url, params)
    .then((response: any) => {
      return new response();
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index, show };

export default requests;
