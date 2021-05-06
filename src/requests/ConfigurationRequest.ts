import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";

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

const requests = { index };
export default requests