import React, { Component } from 'react';

type TBlogComponentProps = { dispatch: any }
interface IBlogComponentState { h1: string, body: string }

export default class Blog extends Component<TBlogComponentProps, IBlogComponentState> {
  constructor(props: TBlogComponentProps) {
    super(props);

    this.state = {
      h1: "Блог",
      body: ""
    };
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
