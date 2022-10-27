import {
    GET_PORTFOLIO_ITEMS,
    GET_PORTFOLIO_ITEMS_SUCCESS,
    GET_PORTFOLIO_ITEMS_FAIL
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";
import {IPortfolioItem} from "../interfaces/IPortfolioItem";

interface IPortfolioItemReducer {
    apiLoading: boolean,
    portfolio_items: IPortfolioItem[]
}

const initialState: IPortfolioItemReducer = {
    apiLoading: false,
    portfolio_items: []
}

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction): IPortfolioItemReducer {
    const {type, payload} = action;

    switch (type) {
        case GET_PORTFOLIO_ITEMS:
            return {
                ...state,
                portfolio_items: [],
                apiLoading: true
            };
        case GET_PORTFOLIO_ITEMS_SUCCESS:
            return {
                ...state,
                apiLoading: false,
                portfolio_items: payload.data.portfolio_items
            };
        case GET_PORTFOLIO_ITEMS_FAIL:
            return {
                ...state,
                apiLoading: false
            };
        default:
            return state;
    }
}
