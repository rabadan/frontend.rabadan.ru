import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {Link} from "react-router-dom";

const connector = connect(
  ({ AuthReducer, ConfigurationReducer, PageReducer }: TRootState) => ({
    configuration: ConfigurationReducer.configuration,
    lang: ConfigurationReducer.lang,
    page: PageReducer.page,
    user: AuthReducer.user,
  }),
  {}
);

type TFooterProps = ConnectedProps<typeof connector>;

const FooterComponent: React.FC<TFooterProps> = ({user, configuration, lang, page}) => {
  useEffect(() => {}, [user, page, lang]);

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
                {socialLink('social_github', 'fab fa-github')}
                {socialLink('social_linkedin', 'fab fa-linkedin-in')}
                {socialLink('social_instagram', 'fab fa-instagram')}
                {socialLink('social_facebook', 'fab fa-facebook-f')}
                {socialLink('social_vk', 'fab fa-vk')}
              </div>
            </div>
            <div className="col-md-6 m-10px-tb text-center text-md-right">
              {
                user ?
                  (<Link to={`/${lang}/profile`} className="show-only-hover mr-2">
                    <i className="fas fa-user" />
                  </Link>) :
                  (<Link to={`/${lang}/login`} className="show-only-hover mr-2">
                    <i className="fas fa-sign-in-alt" />
                  </Link>)
              }
              {user &&
                user.is_admin &&
                page &&
                (<Link to={`/${lang}/pages/${page.slug}/edit`}><i className="fas fa-pencil-alt" />&nbsp;</Link>)}
              © 2020 copyright all right reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default connector(FooterComponent);