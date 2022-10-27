import {
    GET_PORTFOLIO_ITEMS,
    GET_PORTFOLIO_ITEMS_SUCCESS,
    GET_PORTFOLIO_ITEMS_FAIL,
    SET_MESSAGE,
} from './Types';
import PortfolioItemRequest from '../requests/PortfolioItemRequest';
import {Dispatch} from "redux";

export function getPortfolioItems() {
    return (dispatch: Dispatch) => {
        dispatch({type: GET_PORTFOLIO_ITEMS});

        return PortfolioItemRequest.index()
            .then(portfolio_items => {
                console.log('portfolio_items', portfolio_items);
                dispatch({type: GET_PORTFOLIO_ITEMS_SUCCESS, payload: {data: portfolio_items}});
                return Promise.resolve();
            })
            .catch(error => {
                dispatch({type: GET_PORTFOLIO_ITEMS_FAIL});
                dispatch({type: SET_MESSAGE, payload: error.description});
                return Promise.reject();
            });
    };
}

