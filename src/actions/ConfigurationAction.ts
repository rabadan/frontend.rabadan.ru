import {
  GET_CONFIGURATION,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAIL,
  SET_CONFIGURATION,
  SET_CONFIGURATION_SUCCESS,
  SET_CONFIGURATION_FAIL,
  SET_MESSAGE, SET_LANG
} from './Types';

import {Dispatch} from "redux";
import ConfigurationRequest from "../requests/ConfigurationRequest";
import {changeLang} from "../I18n";

export const getConfigurations = () => (dispatch: Dispatch) => {
  dispatch({type: GET_CONFIGURATION});

  ConfigurationRequest.index().then(
    (data) => {
      dispatch({ type: GET_CONFIGURATION_SUCCESS, payload: {data: data}});
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: GET_CONFIGURATION_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });

      return Promise.reject();
    }
  );
}

export const setConfiguration = (name:string|undefined, data: string) => (dispatch: Dispatch) => {
  dispatch({type: SET_CONFIGURATION});

  const formData = new FormData();
  formData.append('configuration[data]', data)

  ConfigurationRequest.put(name, formData).then(
    (result) => {
      dispatch({ type: SET_CONFIGURATION_SUCCESS});
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: SET_CONFIGURATION_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });

      return Promise.reject();
    }
  );
}

export const setConfigurationLang = (lang: string) => (dispatch: Dispatch) => {
  dispatch({type: SET_LANG, payload: changeLang(lang)});
}