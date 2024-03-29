import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import i18n from "i18n-js";
import {getPage} from "../actions/PageAction";
import {getPortfolioItems} from "../actions/PortfolioItemAction";
import {PortfolioItemsComponent} from "./portfolios/PortfolioItemsComponent";

const pageSlug = 'portfolio';
const connector = connect(
  ({ConfigurationReducer, PageReducer, PortfolioItemReducer}: TRootState) => ({
    lang: ConfigurationReducer.lang,
    portfolio_items: PortfolioItemReducer.portfolio_items,
    page: PageReducer.page
  }),
  {getPortfolioItems, getPage}
);

type TPortfolioItemProps = ConnectedProps<typeof connector>;

const PortfolioComponent: React.FC<TPortfolioItemProps> = ({getPage, getPortfolioItems, page, lang, portfolio_items}) => {
  useEffect(() => {getPage(pageSlug, lang, 'portrait')}, [lang, getPage]);
  useEffect(() => {getPortfolioItems()}, [lang, getPortfolioItems]);

  if (!page) {
    return (<h1>Loading... <i className='fas fs-spin fa-spinner'/></h1>)
  }

  document.title = page.title || i18n.t('navbar.about');
  // @ts-ignore
  document.querySelector('meta[name="description"]').content = page.seo_desc
  // @ts-ignore
  document.querySelector('meta[name="keywords"]').content = page.seo_key

  return (
    <div>
      <section className="page-title dark-bg pt-4 pb-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 white-color text-center">
              <h1>{page.h1}</h1>
              <p>{page.seo_desc}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="px-3 pt-1">
        <article className="article">
          <div dangerouslySetInnerHTML={{__html: page.body}} id="portfolio"/>
          <PortfolioItemsComponent portfolio_items={portfolio_items} />
        </article>
      </div>
    </div>
  );
}

export default connector(PortfolioComponent);