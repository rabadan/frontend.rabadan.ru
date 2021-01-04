import React  from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from "./components/NavbarComponent";
import RoutesComponent from "./components/RoutesComponent";

import {clearMessage} from "./actions/MessageAction";
import {setCurrentUser} from "./actions/UserAction";
import { history } from './helpers/History';
import setAuthorizationToken from "./services/setAuthorizationToken";

const connector = connect(
  () => ({}),
  { clearMessage, setCurrentUser },
);

type TAppContainerProps = ConnectedProps<typeof connector>;

const App: React.FC<TAppContainerProps> = ({clearMessage, setCurrentUser}) => {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    setCurrentUser();
  }

  history.listen(() => {
    clearMessage()
  });

  return (
    <Router history={history}>
      <div>
        <NavbarComponent />
        <RoutesComponent />
      </div>
    </Router>
  );
}

export default connector(App);
