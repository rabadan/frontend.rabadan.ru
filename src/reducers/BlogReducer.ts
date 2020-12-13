import {
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
} from '../actions/Types';

import IReduxAction from "../interfaces/IReduxAction";
import {IBlog} from "../interfaces/IBlog";


interface IBlogReducer {
  apiLoading: boolean,
  blog?: IBlog,
  blogs: IBlog[]
}

const initialState: IBlogReducer = {
  apiLoading: false,
  blog: undefined,
  blogs: []
}

export default function (state = initialState, action: IReduxAction): IBlogReducer {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGS:
      return {
        ...state,
        apiLoading: true,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        apiLoading: false,
        blogs: payload.data
      };
    case GET_BLOGS_FAIL:
      return {
        ...state,
        apiLoading: false
      };
    case GET_BLOG:
      return {
        ...state,
        apiLoading: true,
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        apiLoading: false,
        blog: payload.data
      };
    case GET_BLOG_FAIL:
      return {
        ...state,
        apiLoading: false
      };
    default:
      return state;
  }
}
