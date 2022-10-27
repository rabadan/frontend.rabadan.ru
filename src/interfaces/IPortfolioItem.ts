export interface IPortfolioItem {
  id: string,
  title?: string,
  company?: string,
  date_from: Date,
  date_to: Date,
  text: string,
  period: string,
  technology_use: string,
  is_show: boolean
}

export type TPortfolioItem = {
  id: string,
  title?: string,
  company?: string,
  date_from: string,
  date_to: string,
  text: string,
  technology_use: string,
  is_show: boolean
}

export interface TPortfolioItemsResponse {
  portfolio_items: TPortfolioItem[],
}
