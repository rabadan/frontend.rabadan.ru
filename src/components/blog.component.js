import React, { Component } from "react";

export default class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      h1: "Блог",
      body: ""
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>{this.state.h1}</h1>
        </header>
      </div>
    );
  }
}
