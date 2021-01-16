import React from 'react';
import {connect, ConnectedProps} from "react-redux";

const connector = connect(
  () => ({}),
  {}
);

type TWhatIDoProps = ConnectedProps<typeof connector>;

const WhatIDoComponent: React.FC<TWhatIDoProps> = () => {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>What I Do</h2>
              <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                websites</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-4">
            <div className="feature-box-1">
              <div className="icon">
                <i className="icon-desktop" />
              </div>
              <div className="feature-content">
                <h5>Unique design</h5>
                <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                  websites.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="feature-box-1">
              <div className="icon">
                <i className="icon-pricetags" />
              </div>
              <div className="feature-content">
                <h5>Different Layout</h5>
                <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                  websites.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="feature-box-1">
              <div className="icon">
                <i className="icon-chat" />
              </div>
              <div className="feature-content">
                <h5>Make it Simple</h5>
                <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                  websites.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="feature-box-1">
              <div className="icon">
                <i className="icon-mobile" />
              </div>
              <div className="feature-content">
                <h5>Responsiveness</h5>
                <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                  websites.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="feature-box-1">
              <div className="icon">
                <i className="icon-target" />
              </div>
              <div className="feature-content">
                <h5>Testing for Perfection</h5>
                <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                  websites.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="feature-box-1">
              <div className="icon">
                <i className="icon-tools-2" />
              </div>
              <div className="feature-content">
                <h5>Advanced Options</h5>
                <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                  websites.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connector(WhatIDoComponent);