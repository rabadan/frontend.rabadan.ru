import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import authHeader from "../services/AuthHeader";
import {IPageResponse} from "../interfaces/IPage";

const API_URL = process.env.REACT_APP_API_URL;

async function show(slug: string) {
  const url = `${API_URL}api/v1/pages/${slug}`;

  return RequestsService.get<any>(url)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function put(slug: string, formData: FormData) {
  const url = `${API_URL}api/v1/pages/${slug}`;
  const headers = {headers: authHeader()};
  return RequestsService.put<IPageResponse>(url, formData, headers)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { show, put };

export default requests;
