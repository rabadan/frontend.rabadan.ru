import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {TRootState} from "../index";

const connector = connect(
  ({ AuthReducer }: TRootState) => ({
    user: AuthReducer.user,
  }),
  {},
);
type TProfileProps = ConnectedProps<typeof connector>;

class Profile extends Component<TProfileProps> {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Email:</strong> {currentUser.email}
          </h3>
        </header>
      </div>
    );
  }
}

export default connector(Profile);