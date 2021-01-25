import {
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAIL,
  SET_PAGE,
  SET_PAGE_SUCCESS,
  SET_PAGE_FAIL,
  CHANGE_PAGE,
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";
import {IPage} from "../interfaces/IPage";

interface IPageReducer {
  apiLoading: boolean,
  page?: IPage,
}

const initialState: IPageReducer = {
  apiLoading: false,
  page: undefined,
}

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction): IPageReducer {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGE:
      return {
        ...state,
        page: undefined,
        apiLoading: true,
      };
    case GET_PAGE_SUCCESS:
      return {
        ...state,
        apiLoading: false,
        page: payload.data
      };
    case GET_PAGE_FAIL:
      return {
        ...state,
        apiLoading: false
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: payload.data
      };
    case SET_PAGE:
      return {
        ...state,
        apiLoading: true,
      };
    case SET_PAGE_SUCCESS:
      return {
        ...state,
        apiLoading: false,
        page: payload.data
      };
    case SET_PAGE_FAIL:
      return {
        ...state,
        apiLoading: false
      };
    default:
      return state;
  }
}
