import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TBlogResponse} from "../interfaces/IBlog";
import authHeader from "../services/AuthHeader";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
  const url = `${API_URL}api/v1/configurations`;

  return RequestsService.get<any>(url)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function put(name: string|undefined, formData: FormData) {
  const url = `${API_URL}api/v1/configurations/${name}`;
  const headers = {headers: authHeader()};
  return RequestsService.put<TBlogResponse>(url, formData, headers)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index, put };
export default requests