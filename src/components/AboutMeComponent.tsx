import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {getPage} from "../actions/PageAction";
import i18n from "i18n-js";

const pageSlug = 'about';
const connector = connect(
  ({ ConfigurationReducer, PageReducer }: TRootState) => ({
    lang: ConfigurationReducer.lang,
    configuration: ConfigurationReducer.configuration,
    page: PageReducer.page
  }),
  {getPage}
);

type TAboutMeProps = ConnectedProps<typeof connector>;

const AboutMeComponent: React.FC<TAboutMeProps> = ({getPage, page, lang, configuration}) => {
  useEffect(() => {
    getPage(pageSlug, lang, 'portrait')
  }, [lang, getPage]);

  if (!page) {
    return (<h1>Loading... <i className='fas fs-spin fa-spinner' /></h1>)
  }

  document.title = page.title || i18n.t('navbar.about');
  // @ts-ignore
  document.querySelector('meta[name="description"]').content = page.seo_desc
  // @ts-ignore
  document.querySelector('meta[name="keywords"]').content = page.seo_key

  return (
    <section className="section about-section gray-bg" id="about">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-6">
            <div className="about-text go-to">
              <h3 className="dark-color">{page.h1}</h3>
              <h6 className="theme-color lead">{page.footer}</h6>
              <div dangerouslySetInnerHTML={{__html: page.body}} />
              <div className="row about-list">
                <div className="col-md-6">
                  <div className="media">
                    <label>{i18n.t('contacts.user_age')}</label>
                    <p>{configuration.user_age}</p>
                  </div>
                  <div className="media">
                    <label>{i18n.t('contacts.residence')}</label>
                    <p>{configuration.contacts_residence}</p>
                  </div>
                  <div className="media">
                    <label className="ru_long">{i18n.t('contacts.user_education')}</label>
                    <p>{configuration.user_education}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <label>E-mail</label>
                    <p>{configuration.contacts_email}</p>
                  </div>
                  <div className="media">
                    <label>{i18n.t('contacts.phone')}</label>
                    <p>{configuration.contacts_phone}</p>
                  </div>
                  <div className="media">
                    <label>Skype</label>
                    <p>{configuration.contacts_skype}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-avatar">
              <img src={ page.image } title="" alt="" />
            </div>
          </div>
        </div>
        <div className="counter">
          <div className="row">
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
                <h6 className="count h2" data-to="500" data-speed="500">{configuration.counter_company}</h6>
                <p className="m-0px font-w-600">{i18n.t('contacts.counter_company')}</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
                <h6 className="count h2" data-to="150" data-speed="150">{configuration.counter_project}</h6>
                <p className="m-0px font-w-600">{i18n.t('contacts.counter_project')}</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
                <h6 className="count h2" data-to="850" data-speed="850">{configuration.counter_year}</h6>
                <p className="m-0px font-w-600">{i18n.t('contacts.counter_year')}</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
                <h6 className="count h2" data-to="190" data-speed="190">{configuration.counter_technology}</h6>
                <p className="m-0px font-w-600">{i18n.t('contacts.counter_technology')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connector(AboutMeComponent);