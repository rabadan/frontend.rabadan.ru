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

const ProfileComponent: React.FC<TProfileProps> = ({user}) => {
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Email:</strong> {user.email}
        </h3>
      </header>
    </div>
  );
}

export default connector(ProfileComponent);