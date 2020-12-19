import React from 'react';
import {Link} from "react-router-dom";
import i18n from "../I18n";
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {logout} from "../actions/AuthAction";

const connector = connect(
  ({ AuthReducer }: TRootState) => ({
    user: AuthReducer.user
  }),
  { logout },
);

type TNavbarContainerProps = ConnectedProps<typeof connector>;

const NavbarComponent: React.FC<TNavbarContainerProps> = ({user, logout}) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={'/'} className="navbar-brand">
        RABADAN.RU
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={'/blogs'} className="nav-link">
            {i18n.t('blog.title')}
          </Link>
        </li>
      </div>

      {user ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={'/profile'} className="nav-link">
              {user.name}
            </Link>
          </li>
          <li className="nav-item">
            <a href={'/login'} className="nav-link" onClick={logout}>
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
        </div>
      )}
    </nav>
  );
};

export default connector(NavbarComponent);