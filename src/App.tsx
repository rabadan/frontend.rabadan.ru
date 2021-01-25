import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Router} from 'react-router-dom';

import './App.scss';

import NavbarComponent from "./components/NavbarComponent";
import RoutesComponent from "./components/RoutesComponent";

import {clearMessage} from "./actions/MessageAction";
import {history} from './helpers/History';
import setAuthorizationToken from "./services/setAuthorizationToken";
import {getConfigurations} from "./actions/ConfigurationAction";
import FooterComponent from "./components/FooterComponent";
import i18n from "./I18n";
import {TRootState} from "./index";
import {setCurrentUser} from "./actions/UserAction";
import LangButtonsComponent from "./components/LangButtonsComponent";

const connector = connect(
  ({ConfigurationReducer}: TRootState) => ({
    lang: ConfigurationReducer.lang
  }),
  {clearMessage, getConfigurations, setCurrentUser},
);

type TAppContainerProps = ConnectedProps<typeof connector>;

const App: React.FC<TAppContainerProps> = ({clearMessage, getConfigurations, setCurrentUser}) => {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    setCurrentUser();
  }

  getConfigurations()

  history.listen(() => {
    clearMessage()
  });

  // @ts-ignore
  // @ts-ignore
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
            <div className='text-center' style={{height: '13px'}}>
              <LangButtonsComponent />
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
