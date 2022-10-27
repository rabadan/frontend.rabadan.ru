import {IPortfolioItem, TPortfolioItem} from '../interfaces/IPortfolioItem';

export default class PortfolioItem implements IPortfolioItem {
  private readonly _id: string;
  private readonly _title?: string;
  private readonly _company?: string;
  private readonly _date_from: Date;
  private readonly _date_to: Date;
  private readonly _text: string;
  private readonly _technology_use: string;
  private readonly _is_show: boolean;

  constructor(portfolio_item: TPortfolioItem) {
    this._id = portfolio_item.id;
    this._title = portfolio_item.title;
    this._company = portfolio_item.company;
    this._date_from = new Date(portfolio_item.date_from);
    this._date_to = new Date(portfolio_item.date_to);
    this._text = portfolio_item.text;
    this._technology_use = portfolio_item.technology_use;
    this._is_show = portfolio_item.is_show;
  }

  get id(): string {
    return this._id;
  }

  get title(): string | undefined {
    return this._title;
  }

  get company(): string | undefined {
    return this._company;
  }

  get date_from(): Date {
    return this._date_from;
  }

  get date_to(): Date {
    return this._date_to;
  }

  get text(): string {
    return this._text ? this._text : '-';
  }

  get period(): string {
    return `${this._date_from.getFullYear()} - ${this._date_to.getFullYear()}`;
  }

  get technology_use(): string {
    return this._technology_use ? this._technology_use : '-';
  }

  get is_show(): boolean {
    return this._is_show;
  }
}
