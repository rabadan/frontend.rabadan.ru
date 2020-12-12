import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Home from './components/HomeComponent';
import Blog from './components/BlogComponent';
import Profile from './components/ProfileComponent';

import { logout } from './actions/Auth';
import { clearMessage } from './actions/Message';

import { history } from './helpers/History';
import i18n from './I18n';
import {IUser, TUser} from "./interfaces/IUser";

type TAppProps = { user: TUser, dispatch: any }
interface IAppState {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser?: IUser;
}

class App extends Component<TAppProps, IAppState> {
  constructor(props: TAppProps) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };

    history.listen(() => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={'/'} className="navbar-brand">
              RABADAN.RU
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/blog'} className="nav-link">
                  {i18n.t('blog.blog')}
                </Link>
              </li>
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">
                    {currentUser.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href={'/login'} className="nav-link" onClick={this.logOut}>
                    {i18n.t('auth.logout')}
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">
                    {i18n.t('auth.login')}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">
                    {i18n.t('auth.sign_up')}
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/blog" component={Blog} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state: any) {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(App);
