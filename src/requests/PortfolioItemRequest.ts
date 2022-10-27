import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TPortfolioItemsResponse} from "../interfaces/IPortfolioItem";
import PortfolioItem from "../entities/PortfolioItem";

const API_URL = process.env.REACT_APP_API_URL;

async function index() {
    const url = `${API_URL}api/v1/portfolio_items`;
    const params = {headers: authHeader()};

    return RequestsService.get<TPortfolioItemsResponse>(url, params)
        .then((response: TPortfolioItemsResponse) => {
            return {
                portfolio_items: response.portfolio_items.map(function (portfolio_item) {
                    return new PortfolioItem(portfolio_item)
                }),
            };
        })
        .catch((error: TError) => {
            throw error;
        });
}

const requests = {index};
export default requests
