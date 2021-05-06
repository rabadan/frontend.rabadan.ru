import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {TRootState} from "../../index";
import {logout} from "../../actions/AuthAction";
import i18n from "../../I18n";

const connector = connect(
  ({ AuthReducer, ConfigurationReducer }: TRootState) => ({
    user: AuthReducer.user,
    lang: ConfigurationReducer.lang,
    configuration: ConfigurationReducer.configuration
  }),
  {logout},
);
type TProfileProps = ConnectedProps<typeof connector>;

const ProfileComponent: React.FC<TProfileProps> = ({lang, user, logout}) => {

  if (!user) {
    return <Redirect to={`/${lang}/login`} />;
  }

  return (
    <section className='section'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title"><h2>{user.name}</h2>
              <p>{user.email}</p>
              <a href={`/${lang}/login`} className="nav-link pl-0" onClick={logout}>{i18n.t('auth.logout')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connector(ProfileComponent);