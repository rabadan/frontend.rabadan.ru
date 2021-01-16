import React from 'react';
import {connect, ConnectedProps} from "react-redux";

const connector = connect(
  () => ({}),
  {}
);

type TLatestPostsProps = ConnectedProps<typeof connector>;

const LatestPostsComponent: React.FC<TLatestPostsProps> = () => {
  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>Latest News</h2>
              <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                websites</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="blog-grid">
              <div className="blog-img">
                <div className="date">
                  <span>04</span>
                  <label>FEB</label>
                </div>
                <a href="blog.html">
                  <img src={'static/img/blog-1.jpg'} title="" alt="" />
                </a>
              </div>
              <div className="blog-info">
                <h5><a href="blog.html">Prevent 75% of visitors from google analytics</a></h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.</p>
                <div className="btn-bar">
                  <a href="blog.html" className="px-btn-arrow">
                    <span>Read More</span>
                    <i className="arrow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog-grid">
              <div className="blog-img">
                <div className="date">
                  <span>04</span>
                  <label>FEB</label>
                </div>
                <a href="blog.html">
                  <img src={'static/img/blog-1.jpg'} title="" alt="" />
                </a>
              </div>
              <div className="blog-info">
                <h5><a href="blog.html">Prevent 75% of visitors from google analytics</a></h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.</p>
                <div className="btn-bar">
                  <a href="blog.html" className="px-btn-arrow">
                    <span>Read More</span>
                    <i className="arrow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog-grid">
              <div className="blog-img">
                <div className="date">
                  <span>04</span>
                  <label>FEB</label>
                </div>
                <a href="blog.html">
                  <img src={'static/img/blog-1.jpg'} title="" alt="" />
                </a>
              </div>
              <div className="blog-info">
                <h5><a href="blog.html">Prevent 75% of visitors from google analytics</a></h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.</p>
                <div className="btn-bar">
                  <a href="blog.html" className="px-btn-arrow">
                    <span>Read More</span>
                    <i className="arrow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connector(LatestPostsComponent);