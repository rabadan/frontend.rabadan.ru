import authHeader from '../services/AuthHeader';
import RequestsService from "../services/RequestsService";
import {TError} from "../interfaces/IError";
import {IBlog, TBlogListResponse, TBlogResponse} from "../interfaces/IBlog";
import Blog from "../entities/Blog";

const API_URL = process.env.REACT_APP_API_URL;

async function index(page:number = 1) {
  const url = `${API_URL}api/v1/blogs?page=${page}`;
  const params = { headers: authHeader() };

  return RequestsService.get<TBlogListResponse>(url, params)
    .then((response: TBlogListResponse) => {
      return {
        posts: response.posts.map(function(blogItem) {return new Blog(blogItem) }),
        total_pages: response.total_pages
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
      return new Blog(response);
    })
    .catch((error: TError) => {
      throw error;
    });
}

async function put(blog: IBlog, formData: FormData) {
  const url = `${API_URL}api/v1/blogs/${blog.slug}`
  const headers = {headers: authHeader()};
  return RequestsService.put<TBlogResponse>(url, formData, headers)
    .then((response: any) => {
      return response;
    })
    .catch((error: TError) => {
      throw error;
    });
}

const requests = { index, show, put };
export default requests
