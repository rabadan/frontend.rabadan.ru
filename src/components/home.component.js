import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      h1: "",
      body: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          h1: response.data.h1,
          body: response.data.body
        });
      },
      error => {
        this.setState({
          h1: 'Connect ERROR',
          body:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>{this.state.h1}</h1>
          <p>{this.state.body}</p>
        </header>
      </div>
    );
  }
}
