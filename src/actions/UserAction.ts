import {
  SET_USER,
  SET_MESSAGE, USER_LOGIN_FAIL
} from './Types';

import {Dispatch} from "redux";
import UserRequest from "../requests/UserRequest";


export const setCurrentUser = () => (dispatch: Dispatch) => {
  UserRequest.profile().then(
    (user) => {
      dispatch({ type: SET_USER, payload: {data: user}});
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: USER_LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });

      return Promise.reject();
    }
  );
}
