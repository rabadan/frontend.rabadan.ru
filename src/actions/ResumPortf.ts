import {
    GET_PORTFOLIOS,
    GET_PORTFOLIOS_SUCCESS,
    GET_PORTFOLIOS_FAIL,
    SET_MESSAGE,
} from './Types';
import PortfolioRequest from '../requests/PortFoilo';
import {Dispatch} from "redux";
  
export function getPortfolios(page:number = 1) {
    return (dispatch: Dispatch) => {
    dispatch({ type: GET_PORTFOLIOS });
  
    return PortfolioRequest.index()
    .then(page => {
        dispatch({type: GET_PORTFOLIOS_SUCCESS, payload: { data: page }});
        return Promise.resolve();
    })
    .catch(error => {
        dispatch({ type: GET_PORTFOLIOS_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });
        return Promise.reject();
        });
    };
}
  