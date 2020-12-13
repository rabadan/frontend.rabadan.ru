import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TBlogResponse} from "../interfaces/IBlog";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
  const url = `${API_URL}api/v1/blogs`;
  const params = { headers: authHeader() };

  return RequestsService.get<TBlogResponse[]>(url, params)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function show(slug: string) {
  const url = `${API_URL}api/v1/blogs/${slug}`;
  const params = { headers: authHeader() };

  return RequestsService.get<TBlogResponse>(url, params)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

export default { index, show }
