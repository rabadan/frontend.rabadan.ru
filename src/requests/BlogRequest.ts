import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {TBlogListResponse, TBlogResponse} from "../interfaces/IBlog";
import Blog from "../entities/Blog";

const API_URL = process.env.REACT_APP_API_URL;

async function index(page:number = 1) {
  const url = `${API_URL}api/v1/blogs?page=${page}`;
  const params = { headers: authHeader() };

  return RequestsService.get<TBlogListResponse>(url, params)
    .then((response: TBlogListResponse) => {
      return {
        blogs: response.blogs.map(function(blogItem) {return new Blog(blogItem) }),
        pagination: response.pagination
      };
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function show(slug: string) {
  const url = `${API_URL}api/v1/blogs/${slug}`;
  const params = { headers: authHeader() };

  return RequestsService.get<TBlogResponse>(url, params)
    .then((response: TBlogResponse) => {
      return new Blog(response.blog);
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index, show };
export default requests
