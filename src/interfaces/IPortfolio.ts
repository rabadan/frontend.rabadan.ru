export interface IPortfolio {
  id: string,
  title: string,
  company: string,
  date_from: string,
  date_to: string,
  text: string,
  technology_use: string,
  is_show: boolean
}

export type TPortfolio = {
  id: string,
  title: string,
  company: string,
  date_from: string,
  date_to: string,
  text: string,
  technology_use: string,
  is_show: boolean
}

export interface TPortfoliosResponse {
  portfolios: TPortfolio[],
}
