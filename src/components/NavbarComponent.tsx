import React from 'react';
import {Link} from "react-router-dom";
import i18n from "../I18n";
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {logout} from "../actions/AuthAction";

const connector = connect(
  ({ AuthReducer, ConfigurationReducer }: TRootState) => ({
    user: AuthReducer.user,
    lang: ConfigurationReducer.lang,
  }),
  { logout },
);

type TNavbarContainerProps = ConnectedProps<typeof connector>;

const NavbarComponent: React.FC<TNavbarContainerProps> = () => {
  return (
    <ul className="nav">
      <li>
        <Link to={'/'} className="nav-link">
          {i18n.t('navbar.home')}
        </Link>
      </li>
      <li>
        <Link to={'/about'} className="nav-link">
          {i18n.t('navbar.about')}
        </Link>
      </li>
      <li>
        <Link to={'/resume'} className="nav-link">
          {i18n.t('navbar.resume')}
        </Link>
      </li>
      <li>
        <Link to={'/portfolio'} className="nav-link">
          {i18n.t('navbar.portfolio')}
        </Link>
      </li>
      <li>
        <Link to={'/blogs'} className="nav-link">
          {i18n.t('blog.title')}
        </Link>
      </li>
      <li>
        <Link to={'/contacts'} className="nav-link">
          {i18n.t('navbar.contactus')}
        </Link>
      </li>
    </ul>


    // <nav className="navbar navbar-expand navbar-dark bg-dark">
    //   <Link to={'/'} className="navbar-brand">
    //     RABADAN.RU
    //   </Link>
    //   <div className="navbar-nav mr-auto">
    //     <li className="nav-item">
    //       <Link to={'/blogs'} className="nav-link">
    //         {i18n.t('blog.title')}
    //       </Link>
    //     </li>
    //   </div>
    //
    //   {user ? (
    //     <div className="navbar-nav ml-auto">
    //       <li className="nav-item">
    //         <Link to={'/profile'} className="nav-link">
    //           {user.name}
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <a href={'/login'} className="nav-link" onClick={logout}>
    //           {i18n.t('auth.logout')}
    //         </a>
    //       </li>
    //     </div>
    //   ) : (
    //     <div className="navbar-nav ml-auto">
    //       <li className="nav-item">
    //         <Link to={'/login'} className="nav-link">
    //           {i18n.t('auth.login')}
    //         </Link>
    //       </li>
    //     </div>
    //   )}
    // </nav>
  );
};

export default connector(NavbarComponent);