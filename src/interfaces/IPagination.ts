export interface IPagination {
  current: number,
  has_next_page: boolean,
  previous?: number,
  next?: number,
  limit: number,
  total_pages: number,
  total_count: number
}
