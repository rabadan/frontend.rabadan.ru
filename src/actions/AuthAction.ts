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
import {Dispatch} from "redux";
import {IOauthParams, TUserFacebookResponse, TUserVkResponse} from "../interfaces/IUser";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

export const register = (name: string, email: string, password: string) => (dispatch: Dispatch) => {
  dispatch({ type: USER_REGISTER });

  return AuthRequest.sign_up(name, email, password).then(
    (jwtToken) => {
      localStorage.setItem('jwtToken', jwtToken);
      dispatch({ type: USER_REGISTER_SUCCESS });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: USER_REGISTER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });
      return Promise.reject();
    }
  );
};

export const login = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch({ type: USER_LOGIN });

  return AuthRequest.sign_in(email, password).then(
    (jwtToken) => {
      localStorage.setItem('jwtToken', jwtToken);
      dispatch({ type: USER_LOGIN_SUCCESS });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: USER_LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });

      return Promise.reject();
    }
  );
};

export const login_with_facebook = (response: TUserFacebookResponse, user_id?: string) => {
  const data:IOauthParams = {
    service: "facebook",
    service_id: response.userID,
    service_email: response.email,
    token: response.accessToken,
    name: response.name,
    user_id: user_id
  }

  return login_oauth(data);
};

export const login_with_google = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  if ("profileObj" in response) {
    const data: IOauthParams = {
      service: "google",
      service_id: response.profileObj.googleId,
      service_email: response.profileObj.email,
      token: response.tokenId,
      name: response.profileObj.name,
    }

    return login_oauth(data);
  } else {
    return login_break('Close auth');
  }
};

export const login_with_vk = (response: TUserVkResponse, user_id?: string) => {
  if (response.status !== "connected") {
    return login_break('Close auth');
  }

  const data:IOauthParams = {
    service: "vk",
    service_id: response.session.user.id,
    service_email: `${response.session.user.id}@vk.com`,
    token: 'token',
    name: `${response.session.user.first_name} ${response.session.user.last_name}`,
    user_id: user_id
  }

  return login_oauth(data);
};

export const login_break = (message: string) => (dispatch: Dispatch) => {
  dispatch({ type: USER_LOGIN_FAIL });
  dispatch({ type: SET_MESSAGE, payload: message });
}

export const login_oauth = (oauth_data:IOauthParams) => (dispatch: Dispatch) => {
  dispatch({ type: USER_LOGIN });
  return AuthRequest.sign_in_oauth(oauth_data).then(
    (jwtToken) => {
      localStorage.setItem('jwtToken', jwtToken);
      dispatch({ type: USER_LOGIN_SUCCESS });
      window.location.assign('/profile')
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: USER_LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });

      return Promise.reject();
    }
  );
};

export function logout() {
  return (dispatch: Dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch({ type: USER_LOGOUT });
    return Promise.resolve();
  };
}
