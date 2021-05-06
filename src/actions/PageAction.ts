import {
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAIL,
  SET_MESSAGE,
} from './Types';
import PageRequest from '../requests/PageRequest';
import {Dispatch} from "redux";

export function getPage(slug: string, lang?: string, image_variant?: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_PAGE });

    return PageRequest.show(slug, lang, image_variant)
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
