import React  from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/logins/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import NavbarComponent from "./components/NavbarComponent";
import ProfileComponent from "./components/ProfileComponent";
import BlogListComponent from "./components/blogs/BlogListComponent";
import BlogItemComponent from "./components/blogs/BlogItemComponent";

import {clearMessage} from "./actions/MessageAction";
import { history } from './helpers/History';


const connector = connect(
  () => ({}),
  { clearMessage },
);

type TAppContainerProps = ConnectedProps<typeof connector>;

const App: React.FC<TAppContainerProps> = ({clearMessage}) => {

  history.listen(() => {
    clearMessage()
  });

  return (
    <Router history={history}>
      <div>
        <NavbarComponent />

        <div className="container mt-3">
          <Switch>
            <Route exact path={'/'} component={HomeComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/profile" component={ProfileComponent} />
            <Route exact path="/blogs" component={BlogListComponent} />
            <Route exact path="/blogs/:slug" component={BlogItemComponent} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default connector(App);
