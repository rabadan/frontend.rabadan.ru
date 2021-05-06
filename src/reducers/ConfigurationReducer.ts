import {
  GET_CONFIGURATION,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAIL,
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
    user_age?: string;
    user_education?: string;
    contacts_phone?: string;
    contacts_email?: string;
    contacts_skype?: string;
    contacts_residence?: string;
    contacts_address?: string;
    counter_company?: string;
    counter_project?: string;
    counter_year?: string;
    counter_technology?: string;
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
    user_age: '',
    user_education: '',
    contacts_phone: '',
    contacts_email: '',
    contacts_skype: '',
    contacts_residence: '',
    contacts_address: '',
    counter_company: '',
    counter_project: '',
    counter_year: '',
    counter_technology: ''
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
    case SET_LANG:
      return {
        ...state,
        lang: payload,
      };
    default:
      return state;
  }
}
