import {
  GET_CONFIGURATION,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAIL,
  SET_CONFIGURATION,
  SET_CONFIGURATION_SUCCESS,
  SET_CONFIGURATION_FAIL,
  SET_LANG,
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";
import {localeCode} from "../I18n";

export interface IConfigurationReducer {
  apiLoading: boolean;
  lang: string;
  configuration: {
    social_facebook?: string;
    social_vk?: string;
    social_instagram?: string;
    social_linkedin?: string;
    social_github?: string;
    contacts_phone?: string;
    contacts_email?: string;
    contacts_skype?: string;
    contacts_residence?: string;
    contacts_address?: string;
  }
}

const initialState: IConfigurationReducer = {
  apiLoading: false,
  lang: localeCode(),
  configuration: {
    social_facebook: '',
    social_vk: '',
    social_instagram: '',
    social_linkedin: '',
    social_github: '',
    contacts_phone: '',
    contacts_email: '',
    contacts_skype: '',
    contacts_residence: '',
    contacts_address: ''
  }
}

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction): IConfigurationReducer {
  const { type, payload } = action;

  switch (type) {
    case GET_CONFIGURATION:
      return {
        ...state,
      };
    case GET_CONFIGURATION_SUCCESS:
      return {
        ...state,
        configuration: {...state.configuration, ...payload.data}
      };
    case GET_CONFIGURATION_FAIL:
      return {
        ...state,
      };
    case SET_CONFIGURATION:
      return {
        ...state,
        apiLoading: true
      };
    case SET_CONFIGURATION_SUCCESS:
      return {
        ...state,
        apiLoading: false,
      };
    case SET_CONFIGURATION_FAIL:
      return {
        ...state,
        apiLoading: false,
      };
    case SET_LANG:
      return {
        ...state,
        lang: payload,
      };
    default:
      return state;
  }
}
