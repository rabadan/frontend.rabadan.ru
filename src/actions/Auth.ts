import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  SET_MESSAGE
} from './Types';
import AuthRequest from '../requests/AuthRequest';

export const register = (email: string, password: string) => (dispatch: any) => {
  dispatch({ type: USER_REGISTER });

  return AuthRequest.sign_up(email, password).then(
    (data) => {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: { data: data } });
      localStorage.setItem('user', JSON.stringify(data));
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: USER_REGISTER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });
      return Promise.reject();
    }
  );
};

export const login = (email: string, password: string) => (dispatch: any) => {
  dispatch({ type: USER_LOGIN });

  return AuthRequest.sign_in(email, password).then(
    (data) => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { data: data } });
      localStorage.setItem('user', JSON.stringify(data));
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: USER_LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('user');
  dispatch({ type: USER_LOGOUT });
};
