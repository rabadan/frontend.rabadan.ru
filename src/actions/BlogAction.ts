import {
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  SET_BLOG,
  SET_BLOG_SUCCESS,
  SET_BLOG_FAIL,
  SET_MESSAGE, USER_LOGOUT,
} from './Types';
import BlogRequest from '../requests/BlogRequest';
import {Dispatch} from "redux";
import {IBlog} from "../interfaces/IBlog";

export function getBlogs(page:number = 1) {
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_BLOGS });

    return BlogRequest.index(page)
      .then(blogs => {
        dispatch({type: GET_BLOGS_SUCCESS, payload: { data: blogs }});
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
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_BLOG });

    return BlogRequest.show(slug)
      .then(blog => {
        dispatch({type: GET_BLOG_SUCCESS, payload: { data: blog }});
        return Promise.resolve();
      })
      .catch(error => {
        dispatch({ type: GET_BLOG_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });
        return Promise.reject();
      });
  };
}


export function setBlog(blog: IBlog, formData: FormData) {
  return (dispatch: Dispatch) => {
    dispatch({ type: SET_BLOG });

    return BlogRequest.put(blog, formData)
      .then(response => {
        dispatch({type: SET_BLOG_SUCCESS, payload: { data: response }});
        return Promise.resolve();
      })
      .catch(error => {
        dispatch({ type: SET_BLOG_FAIL });
        dispatch({ type: SET_MESSAGE, payload: error.description });

        if (error.code === 401) {
          localStorage.removeItem('user');
          dispatch({ type: USER_LOGOUT });
        }

        return Promise.reject();
      });
  };
}

