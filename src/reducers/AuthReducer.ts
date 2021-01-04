import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SET_USER,
  USER_LOGOUT
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";
import {IUser} from "../interfaces/IUser";

interface IAuthReducer {
  apiLoading: boolean,
  isLoggedIn: boolean,
  user?: IUser
}

const initialState: IAuthReducer = {
  apiLoading: false,
  isLoggedIn: false,
  user: undefined
}

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction<any>): IAuthReducer {
  const { type, payload } = action;

  switch (type) {
    case USER_REGISTER:
      return {
        ...state,
        apiLoading: true,
        isLoggedIn: false
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        apiLoading: true,
        isLoggedIn: false,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        apiLoading: false,
        isLoggedIn: false,
        user: undefined
      };
    case USER_LOGIN:
      return {
        ...state,
        apiLoading: true,
        isLoggedIn: false
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        apiLoading: true,
        isLoggedIn: false
      };
    case SET_USER:
      return {
        ...state,
        apiLoading: false,
        isLoggedIn: true,
        user: payload.data
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        apiLoading: false,
        isLoggedIn: false,
        user: undefined
      };
    case USER_LOGOUT:
      return {
        ...state,
        apiLoading: false,
        isLoggedIn: false,
        user: undefined
      };
    default:
      return state;
  }
}
