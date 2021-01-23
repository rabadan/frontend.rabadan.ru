import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Router} from 'react-router-dom';

import './App.scss';

import NavbarComponent from "./components/NavbarComponent";
import RoutesComponent from "./components/RoutesComponent";

import {clearMessage} from "./actions/MessageAction";
import {history} from './helpers/History';
import setAuthorizationToken from "./services/setAuthorizationToken";
import {getConfigurations, setConfigurationLang} from "./actions/ConfigurationAction";
import FooterComponent from "./components/FooterComponent";
import i18n from "./I18n";
import {TRootState} from "./index";

const connector = connect(
  ({ConfigurationReducer}: TRootState) => ({
    lang: ConfigurationReducer.lang
  }),
  {clearMessage, setConfigurationLang, getConfigurations},
);

type TAppContainerProps = ConnectedProps<typeof connector>;

const App: React.FC<TAppContainerProps> = ({clearMessage, setConfigurationLang, getConfigurations}) => {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
  }

  getConfigurations()

  history.listen(() => {
    clearMessage()
  });

  function setLang(new_lang: string) {
    return function (p1: React.MouseEvent<SVGSVGElement>) {
      setConfigurationLang(new_lang);
    };
  }


  return (
    <Router history={history}>
      <div className="mob-header mh-desk">
        <div className="d-flex">
          <div className="navbar-brand">
            <a className="logo-text" href="/">
              Rabadan
            </a>
          </div>
          <button className="toggler-menu">
            <span/>
            <span/>
            <span/>
          </button>
        </div>
      </div>
      <header className="header-left hl-desk scroll-bar" id="navbar-collapse-toggle">
        <div className="hl-top">
          <div className="hl-logo">
            {i18n.t('home.rabadan')}
            <span>{i18n.t('home.akagasanov')}</span>
            <div className="d-flex justify-content-center">
              <svg onClick={setLang('ru')} className="select-lang-button lang-ru" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 9 6">
                <rect fill="#fff" width="9" height="3"/>
                <rect fill="#d52b1e" y="3" width="9" height="3"/>
                <rect fill="#0039a6" y="2" width="9" height="2"/>
              </svg>
              <svg onClick={setLang('en')} className="select-lang-button lang-en" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 60 30">
                <clipPath id="a">
                  <path d="M0 0v30h60V0z"/>
                </clipPath>
                <clipPath id="b">
                  <path d="M30 15h30v15zv15H0zH0V0zV0h30z"/>
                </clipPath>
                <g clipPath="url(#a)">
                  <path d="M0 0v30h60V0z" fill="#012169"/>
                  <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <NavbarComponent/>
      </header>
      <main className="main-left pb-5">
        <RoutesComponent/>
        <FooterComponent/>
      </main>
    </Router>
  );
}

export default connector(App);
