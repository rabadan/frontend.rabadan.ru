import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {Link} from "react-router-dom";

const connector = connect(
  ({ AuthReducer, ConfigurationReducer }: TRootState) => ({
    configuration: ConfigurationReducer.configuration,
    lang: ConfigurationReducer.lang,
    user: AuthReducer.user,
  }),
  {}
);

type TFooterProps = ConnectedProps<typeof connector>;

const FooterComponent: React.FC<TFooterProps> = ({configuration, lang}) => {
  const socialLink = (key_config: string, icon: string) => {
    // @ts-ignore
    if (configuration && configuration[key_config]) {
      // @ts-ignore
      return (<a target='_blank' rel="noreferrer" href={configuration[key_config]}><i className={icon} /></a>);
    }
  }

  return (
    <div className="fixed-bottom main-left">
      <footer className="footer white bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 m-10px-tb">
              <div className="nav justify-content-center justify-content-md-start">
                {socialLink('social_facebook', 'fab fa-facebook-f')}
                {socialLink('social_instagram', 'fab fa-instagram')}
                {socialLink('social_linkedin', 'fab fa-linkedin-in')}
                {socialLink('social_vk', 'fab fa-vk')}
              </div>
            </div>
            <div className="col-md-6 m-10px-tb text-center text-md-right">
              <Link to={`/${lang}/login`} className="show-only-hover mr-2">
                <i className="fas fa-sign-in-alt" />
              </Link>
              © 2020 copyright all right reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default connector(FooterComponent);