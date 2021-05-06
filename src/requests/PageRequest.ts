import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";

const API_URL = process.env.REACT_APP_API_URL;

async function show(slug: string, lang?: string, image_variant?: string) {
  const url = `${API_URL}api/v1/pages/${slug}`;
  let config = { headers: {}, params: { image_variant: image_variant }}
  if (lang === undefined) { config['headers'] = { 'Accept-Language': lang } }

  return RequestsService.get<any>(url, config)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { show };

export default requests;
