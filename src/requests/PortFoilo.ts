import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TPortfoliosResponse} from "../interfaces/IPortfolio";
import Portfolio from "../entities/Portfolio";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
  const url = `${API_URL}api/v1/portfolio_items`;
  const params = { headers: authHeader() };

  return RequestsService.get<TPortfoliosResponse>(url, params)
    .then((response: TPortfoliosResponse) => {return response})
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index };
export default requests
