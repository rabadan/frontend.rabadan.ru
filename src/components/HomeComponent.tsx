import React from 'react';
import i18n from "../I18n";
import {Link} from "react-router-dom";
import ExperienceComponent from './ExperienceComponent';
import WhatIDoComponent from "./WhatIDoComponent";
import AboutMeComponent from "./AboutMeComponent";
import LatestPostsComponent from "./blogs/LatestPostsComponent";

const HomeComponent: React.FC = () => {
  return (
    <div className="">
      <section id="home" className="home-banner-01" style={{backgroundImage: 'url(static/img/home-banner.jpg)'}}>
        <div className="container">
          <div className="row min-vh-100 align-items-center">
            <div className="col-md-9 col-lg-7">
              <div className="ht-text">
                <h6>{i18n.t('home.hello')},</h6>
                <h1 data-text="Hello, I'm Rachel Roth">I'm Rachel Roth</h1>
                <h2>A <span className="theme-color">Product Designer</span>, Passionate About Solving Complex Problems
                </h2>
                <div className="btn-bar go-to">
                  <Link to={'/contacts'} className="px-btn theme">
                    <span>{i18n.t('contacts.contact_us')}</span>
                    <i className="arrow"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="go-to go-to-next">
          <a href="#about">
            <span/>
          </a>
        </div>
      </section>

      <AboutMeComponent />

      <WhatIDoComponent />

      <ExperienceComponent />

      <LatestPostsComponent />
    </div>
  );
};

export default HomeComponent;