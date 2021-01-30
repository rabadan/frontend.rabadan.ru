import React, {useEffect} from 'react';
import i18n from "../I18n";
import {Link} from "react-router-dom";
import LatestPostsComponent from "./blogs/LatestPostsComponent";
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {getPage} from "../actions/PageAction";
const pageSlug = 'home';

const connector = connect(
  ({ ConfigurationReducer, PageReducer }: TRootState) => ({
    lang: ConfigurationReducer.lang,
    page: PageReducer.page
  }),
  {getPage}
);
type THomeProps = ConnectedProps<typeof connector>;

const HomeComponent: React.FC<THomeProps> = ({getPage, page, lang}) => {
  useEffect(() => {
    getPage(pageSlug, lang, 'portrait_home')
  }, [lang, getPage]);

  if (!page) {
    return (<h1>Loading... <i className='fas fs-spin fa-spinner' /></h1>)
  }

  return (
    <div className="">
      <section id="home" className="home-banner-01" style={{backgroundImage: `url(${page.image})`}}>
        <div className="container">
          <div className="row min-vh-100 align-items-center">
            <div className="col-md-9 col-lg-7">
              <div className="ht-text">
                <h6>{i18n.t('home.hello')},</h6>
                <h1 data-text={page.h1}>{page.h1}</h1>
                <h2>
                  <div dangerouslySetInnerHTML={{__html: page.body}} />
                </h2>
                <div className="btn-bar go-to">
                  <Link to={`/${lang}/contacts`} className="px-btn theme">
                    <span>{i18n.t('contacts.contact_us')}</span>
                    <i className="arrow"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="go-to go-to-next">
          <a href="#about">
            <span/>
          </a>
        </div>
      </section>

      <LatestPostsComponent />
    </div>
  );
};

export default connector(HomeComponent);