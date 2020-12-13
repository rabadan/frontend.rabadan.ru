import {
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  SET_MESSAGE,
} from './Types';
import BlogRequest from '../requests/BlogRequest';

export function getBlogs() {
  return (dispatch: any) => {
    dispatch({ type: GET_BLOGS });

    return BlogRequest.index()
      .then(response => {
        dispatch({type: GET_BLOGS_SUCCESS, payload: { data: response }});
        return Promise.resolve();
      })
      .catch(error => {
        dispatch({ type: GET_BLOGS_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });
        return Promise.reject();
      });
  };
}

export function getBlog(slug: string) {
  return (dispatch: any) => {
    dispatch({ type: GET_BLOG });

    return BlogRequest.show(slug)
      .then(response => {
        dispatch({type: GET_BLOG_SUCCESS, payload: { data: response }});
        return Promise.resolve();
      })
      .catch(error => {
        dispatch({ type: GET_BLOG_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });
        return Promise.reject();
      });
  };
}