import React from "react";
import {IPortfolioItem} from "../../interfaces/IPortfolioItem";

export function PortfolioItemsComponent(props: { portfolio_items: IPortfolioItem[]; }) {
  return (
    <div className="resume-box">
      <ul>
        {props.portfolio_items.reverse().map((portfolio_item, index) =>
          <li key={index.toString()}>
            <div className="icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <span className="time">{portfolio_item.period}</span>
            <div className={'d-flex'}>
              <h5>{portfolio_item.company}</h5>
              <span> &nbsp; </span>
              <h6>{portfolio_item.title}</h6>
            </div>
            <p className={'mb-1'} dangerouslySetInnerHTML={{__html: portfolio_item.text}} />
            <small className={'color-grey line-height-1-1'} dangerouslySetInnerHTML={{__html: portfolio_item.technology_use}} />
          </li>
        )}
      </ul>
    </div>
  );
}
