import {
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  CHANGE_BLOG,
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";
import {IBlog} from "../interfaces/IBlog";


interface IBlogReducer {
  apiLoading: boolean,
  page?: number,
  total_pages?: number,
  blog?: IBlog,
  blogs: IBlog[]
}

const initialState: IBlogReducer = {
  apiLoading: false,
  blog: undefined,
  blogs: []
}

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction): IBlogReducer {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: [],
        apiLoading: true,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        apiLoading: false,
        blogs: payload.data.posts,
        total_pages: payload.data.total_pages,
      };
    case GET_BLOGS_FAIL:
      return {
        ...state,
        apiLoading: false,
        total_pages: undefined
      };
    case GET_BLOG:
      return {
        ...state,
        blog: undefined,
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
    case CHANGE_BLOG:
      return {
        ...state,
        blog: payload.data
      };
    default:
      return state;
  }
}
