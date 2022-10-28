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
import {IPagination} from "../interfaces/IPagination";

interface IBlogReducer {
  apiLoading: boolean,
  pagination?: IPagination,
  blog?: IBlog,
  blogs: IBlog[]
}

const initialState: IBlogReducer = {
  apiLoading: false,
  pagination: {
    current: 1,
    has_next_page: false,
    previous: undefined,
    next: undefined,
    limit: 1,
    total_pages: 1,
    total_count: 1
  },
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
      console.log('GET_BLOGS_SUCCESS', payload.data)
      return {
        ...state,
        apiLoading: false,
        blogs: payload.data.blogs,
        pagination: payload.data.pagination,
      };
    case GET_BLOGS_FAIL:
      return {
        ...state,
        apiLoading: false
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
