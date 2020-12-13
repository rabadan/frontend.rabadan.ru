import React, { Component } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Home from './components/HomeComponent';
import Blog from './components/BlogComponent';
import Profile from './components/ProfileComponent';

import {logout} from './actions/AuthAction';
import {clearMessage} from "./actions/MessageAction";

import { history } from './helpers/History';
import i18n from './I18n';
import {IUser} from "./interfaces/IUser";
import {TRootState} from "./index";

interface IAppState {
  showModeratorBoard?: boolean;
  showAdminBoard?: boolean;
  user?: IUser | undefined;
}

const connector = connect(
  ({ AuthReducer }: TRootState) => ({
    user: AuthReducer.user
  }),
  { },
);

type TAppContainerProps = ConnectedProps<typeof connector>;

class App extends Component<TAppContainerProps, IAppState> {
  constructor(props: TAppContainerProps) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      user: props.user,
    };

    history.listen(() => {
      // this.props.dispatch(clearMessage()); - так было раньше

      // @ts-ignore
      this.props.dispatch(clearMessage())
    });
  }

  logOut() {
    // this.props.dispatch(logout());  - так было раньше

    // @ts-ignore
    this.props.dispatch(logout());
  }

  render() {
    console.log(this);
    const { user } = this.state;

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

            {user ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">
                    {user.email}
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
  const { user } = state.AuthReducer;
  return { user };
}

export default connect(mapStateToProps)(App);
