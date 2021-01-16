import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";

const connector = connect(
  ({ ConfigurationReducer }: TRootState) => ({
    configuration: ConfigurationReducer.configuration,
  }),
  {}
);

type TFooterProps = ConnectedProps<typeof connector>;

const FooterComponent: React.FC<TFooterProps> = ({configuration}) => {
  const socialLink = (key_config: string, icon: string) => {
    // @ts-ignore
    if (configuration && configuration[key_config]) {
      // @ts-ignore
      return (<a target='_blank' rel="noreferrer" href={configuration[key_config]}><i className={icon} /></a>);
    }
  }

  return (
    <div className="fixed-bottom main-left">
      {console.log('configuration render', Object.assign({}, configuration))}
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
              <p>© 2020 copyright all right reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default connector(FooterComponent);