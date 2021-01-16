import React  from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Router } from 'react-router-dom';

import './App.scss';

import NavbarComponent from "./components/NavbarComponent";
import RoutesComponent from "./components/RoutesComponent";

import {clearMessage} from "./actions/MessageAction";
import {setCurrentUser} from "./actions/UserAction";
import { history } from './helpers/History';
import setAuthorizationToken from "./services/setAuthorizationToken";
import {getConfigurations} from "./actions/ConfigurationAction";
import FooterComponent from "./components/FooterComponent";

const connector = connect(
  () => ({}),
  { clearMessage, setCurrentUser, getConfigurations },
);

type TAppContainerProps = ConnectedProps<typeof connector>;

const App: React.FC<TAppContainerProps> = ({clearMessage, setCurrentUser, getConfigurations}) => {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    setCurrentUser();
  }

  getConfigurations()

  history.listen(() => {
    clearMessage()
  });

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
            Rabadan
            <span>Akagasanov</span>
          </div>
        </div>
        <NavbarComponent />
      </header>
      <main className="main-left pb-5">
        <RoutesComponent />
        <FooterComponent />
      </main>
    </Router>
  );
}

export default connector(App);
