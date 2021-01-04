import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TUser} from "../interfaces/IUser";
import User from "../entities/User";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
  const url = `${API_URL}api/v1/home/index`;

  return RequestsService.get<any>(url)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function profile() {
  const url = `${API_URL}api/v1/profile`;

  return RequestsService.get<{user:TUser}>(url)
    .then((response: {user:TUser}) => {
      return new User(response.user);
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index, profile };

export default requests;
