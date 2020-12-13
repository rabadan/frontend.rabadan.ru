import React, { Component } from 'react';

import UserRequest from '../requests/UserRequest';
import {TError} from "../interfaces/IError";

type THomeComponentProps = {}
interface IHomeComponentState { h1: string, body: string }

export default class Home extends Component<THomeComponentProps, IHomeComponentState> {
  constructor(props: Readonly<THomeComponentProps>) {
    super(props);

    this.state = {
      h1: '',
      body: ''
    }
  }

  componentDidMount() {
    UserRequest.index().then(
      (response: IHomeComponentState) => {
        this.setState({
          h1: response.h1,
          body: response.body
        });
      },
      (error: TError) => {

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
