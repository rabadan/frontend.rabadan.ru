import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {getPortfolios} from "../actions/ResumPortf";
import i18n from "i18n-js";

const pageSlug = 'resume';
const connector = connect(
  ({ ConfigurationReducer, PortfolioReducer }: TRootState) => ({
    lang: ConfigurationReducer.lang,
    page: PortfolioReducer.portfolios
  }),
  {getPortfolios}
  );

  type TResumeProps = ConnectedProps<typeof connector>;
  
  const ResumSaidComponent: React.FC<TResumeProps> = ({getPortfolios, page, lang}) => {
    useEffect(() => {
      getPortfolios()
    }, [lang, getPortfolios]);
    


  console.log(page)

  if (!page) {
    return (<h1>Loading... <i className='fas fs-spin fa-spinner' /></h1>)
  }

  // document.title = page.title || i18n.t('navbar.about');
  // // @ts-ignore
  // document.querySelector('meta[name="description"]').content = page.seo_desc
  // // @ts-ignore
  // document.querySelector('meta[name="keywords"]').content = page.seo_key

  return (
    <div>{page.map(ele => ele.text)}</div>)
}

export default connector(ResumSaidComponent);