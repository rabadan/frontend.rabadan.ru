import {IPortfolio} from '../interfaces/IPortfolio';
import React from "react";

export default class Portfolio implements IPortfolio {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _company: string;
  private readonly _date_from: string;
  private readonly _date_to: string;
  private readonly _text: string;
  private readonly _technology_use: string;
  private readonly _is_show: boolean;

  constructor(portfolio: IPortfolio) {
    this._id = portfolio.id;
    this._title = portfolio.title;
    this._company = portfolio.company;
    this._date_from = portfolio.date_from;
    this._date_to = portfolio.date_to;
    this._text = portfolio.text;
    this._technology_use = portfolio.technology_use;
    this._is_show = portfolio.is_show;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get company(): string {
    return this._company;
  }

  get date_from(): string {
    return this._date_from;
  }

  get date_to(): string {
    return this._date_to;
  }

  get text(): string {
    return this._text;
  }

  get technology_use(): string {
    return this._technology_use;
  }

  get is_show(): boolean {
    return this._is_show;
  }
}
