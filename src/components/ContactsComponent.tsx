import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import i18n from "../I18n";
import FeedbackForm from "./forms/FeedbackForm";

const connector = connect(
  ({ ConfigurationReducer }: TRootState) => ({
    configuration: ConfigurationReducer.configuration,
  }),
  {}
);

type TContactsProps = ConnectedProps<typeof connector>;

const ContactsComponent: React.FC<TContactsProps> = ({configuration}) => {
  const socialLink = (key_config: string, icon: string, link_class: string) => {
    // @ts-ignore
    if (configuration && configuration[key_config]) {
      // @ts-ignore
      return (<a target="_blank" rel="noreferrer" className={link_class} href={configuration[key_config]}><i className={icon} /></a>);
    }
  }
  return (
    <div className="">
      <section className="section gray-bg" id="contactus">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title">
                <h2>{i18n.t('navbar.contactus')}</h2>
                <p>{i18n.t('contacts.about_me')}</p>
              </div>
            </div>
          </div>
          <div className="row flex-row-reverse">
            <div className="col-md-7 col-lg-8 m-15px-tb">
              <FeedbackForm />
            </div>
            <div className="col-md-5 col-lg-4 m-15px-tb">
              <div className="contact-name">
                <h5>{i18n.t('contacts.email')}</h5>
                <p>{configuration.contacts_email}</p>
              </div>
              <div className="contact-name">
                <h5>{i18n.t('contacts.phone')}</h5>
                <p>{configuration.contacts_phone}</p>
              </div>
              <div className="social-share nav">
                {socialLink('social_github', 'fab fa-github', 'github_bg')}
                {socialLink('social_linkedin', 'fab fa-linkedin-in', 'linkedin')}
                {socialLink('social_instagram', 'fab fa-instagram', 'dribbble')}
                {socialLink('social_facebook', 'fab fa-facebook', 'behance')}
                {socialLink('social_vk', 'fab fa-vk', 'vk_bg')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connector(ContactsComponent);