import {
  GET_PORTFOLIOS,
  GET_PORTFOLIOS_SUCCESS,
  GET_PORTFOLIOS_FAIL
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";
import {IPortfolio} from "../interfaces/IPortfolio";

interface IPortfolioReducer {
  apiLoading: boolean,
  page?: number,
  total_pages?: number,
  portfolio?: IPortfolio,
  portfolios: IPortfolio[]
}

const initialState: IPortfolioReducer = {
  apiLoading: false,
  portfolio: undefined,
  portfolios: []
}

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction): IPortfolioReducer {
  const { type, payload } = action;

  switch (type) {
    case GET_PORTFOLIOS:
      return {
        ...state,
        portfolios: [],
        apiLoading: true,
      };
    case GET_PORTFOLIOS_SUCCESS:
      return {
        ...state,
        apiLoading: false,
        portfolios: payload.data.posts,
        total_pages: payload.data.total_pages,
      };
    case GET_PORTFOLIOS_FAIL:
      return {
        ...state,
        apiLoading: false,
        total_pages: undefined
      };
    default:
      return state;
  }
}
