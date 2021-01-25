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

const NavbarComponent: React.FC<TNavbarContainerProps> = ({lang}) => {
  return (
    <ul className="nav">
      <li>
        <Link to={`/${lang}`} className="nav-link">
          {i18n.t('navbar.home')}
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/about`} className="nav-link">
          {i18n.t('navbar.about')}
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/resume`} className="nav-link">
          {i18n.t('navbar.resume')}
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/portfolio`} className="nav-link">
          {i18n.t('navbar.portfolio')}
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/blogs`} className="nav-link">
          {i18n.t('blog.title')}
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/contacts`} className="nav-link">
          {i18n.t('navbar.contactus')}
        </Link>
      </li>
    </ul>
  );
};

export default connector(NavbarComponent);