import React from 'react';
import {connect, ConnectedProps} from "react-redux";

const connector = connect(
  () => ({}),
  {}
);

type TExperienceProps = ConnectedProps<typeof connector>;

const ExperienceComponent: React.FC<TExperienceProps> = () => {
  return (
    <section className="section gray-bg" id="resume">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>Experience</h2>
              <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                websites</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 m-15px-tb">
            <div className="resume-box">
              <ul>
                <li>
                  <div className="icon">
                    <i className="fas fa-user-graduate" />
                  </div>
                  <span className="time">2019 - Present</span>
                  <h5>Art Director - Facebook Inc</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-user-graduate" />
                  </div>
                  <span className="time">2019 - Present</span>
                  <h5>Art Director - Facebook Inc</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-user-graduate" />
                  </div>
                  <span className="time">2019 - Present</span>
                  <h5>Art Director - Facebook Inc</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 m-15px-tb">
            <div className="resume-box">
              <ul>
                <li>
                  <div className="icon">
                    <i className="fas fa-briefcase" />
                  </div>
                  <span className="time">2019 - Present</span>
                  <h5>Art Director - Facebook Inc</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-briefcase" />
                  </div>
                  <span className="time">2019 - Present</span>
                  <h5>Art Director - Facebook Inc</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-briefcase" />
                  </div>
                  <span className="time">2019 - Present</span>
                  <h5>Art Director - Facebook Inc</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connector(ExperienceComponent);