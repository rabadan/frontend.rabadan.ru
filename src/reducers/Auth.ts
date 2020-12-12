import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../actions/Types';

import IReduxAction from "../interfaces/IReduxAction";
import {IUser} from "../interfaces/IUser";
interface IAuthState {
  apiLoading: boolean,
  isLoggedIn: boolean,
  user?: IUser
}

const user = JSON.parse(localStorage.getItem('user') as string);

const initialState = user
  ? { apiLoading: false, isLoggedIn: true, user }
  : { apiLoading: false, isLoggedIn: false, user: null };

export default function (state = initialState, action: IReduxAction): IAuthState {
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
        apiLoading: false,
        isLoggedIn: true,
        user: payload.data
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        apiLoading: false,
        isLoggedIn: false
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
