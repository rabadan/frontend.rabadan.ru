import {
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAIL,
  SET_PAGE,
  SET_PAGE_SUCCESS,
  SET_PAGE_FAIL,
  SET_MESSAGE,
} from './Types';
import PageRequest from '../requests/PageRequest';
import {Dispatch} from "redux";

export function getPage(slug: string, lang?: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_PAGE });

    return PageRequest.show(slug, lang)
      .then(page => {
        dispatch({type: GET_PAGE_SUCCESS, payload: { data: page }});
        return Promise.resolve();
      })
      .catch(error => {
        dispatch({ type: GET_PAGE_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });
        return Promise.reject();
      });
  };
}


export function setPage(slug: string, formData: FormData, lang?: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: SET_PAGE });

    return PageRequest.put(slug, formData, lang)
      .then(response => {
        dispatch({type: SET_PAGE_SUCCESS, payload: { data: response }});
        return Promise.resolve();
      })
      .catch(error => {
        dispatch({ type: SET_PAGE_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });

        return Promise.reject();
      });
  };
}

