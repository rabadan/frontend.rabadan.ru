import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {TUser} from "../interfaces/IUser";

type TProfileComponentProps = { user: TUser }

class Profile extends Component<TProfileComponentProps> {
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

function mapStateToProps(state: any) {
  const { user } = state.AuthReducer;
  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);
