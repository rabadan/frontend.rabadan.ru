import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TPortfoliosResponse} from "../interfaces/IPortfolio";
import Portfolio from "../entities/Portfolio";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
  const url = `${API_URL}api/v1/portfolios`;
  const params = { headers: authHeader() };

  return RequestsService.get<TPortfoliosResponse>(url, params)
    .then((response: TPortfoliosResponse) => {
      return {
        posts: response.portfolios.map(function(portfolio) {return new Portfolio(portfolio) }),
      };
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index };
export default requests
