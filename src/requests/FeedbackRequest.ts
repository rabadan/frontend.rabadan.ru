import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {IFeedback} from "../interfaces/IFeedback";

const API_URL = process.env.REACT_APP_API_URL;

async function create(feedback: IFeedback) {
  const url = `${API_URL}api/v1/feedbacks`;

  const formData = new FormData();
  formData.append('feedback[name]', feedback.name)
  formData.append('feedback[email]', feedback.email)
  formData.append('feedback[subject]', feedback.subject)
  formData.append('feedback[message]', feedback.message)

  return RequestsService.post<any>(url, formData)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { create };

export default requests;
