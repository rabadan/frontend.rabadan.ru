import React, { Component } from 'react';
// @ts-ignore
import Form from 'react-validation/build/form';
// @ts-ignore
import Input from 'react-validation/build/input';
// @ts-ignore
import CheckButton from 'react-validation/build/button';
// @ts-ignore
import { isEmail } from 'validator';

import { connect } from 'react-redux';
import { register } from '../actions/AuthAction';
import i18n from '../I18n';
import {Redirect} from "react-router-dom";

const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger py-0 px-2" role="alert">
        {i18n.t('errors.field_required')}
      </div>
    );
  }
};

const email = (value: string) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger py-0 px-2" role="alert">
        {i18n.t('errors.email_not_valid')}
      </div>
    );
  }
};

const vpassword = (value: string) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger py-0 px-2" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

type TRegisterComponentProps = {
  dispatch: any,
  history: any,
  message: string,
  preventDefault: any,
  isLoggedIn: boolean
}
interface IRegisterComponentState { email: string, password: string, successful: boolean }

class Register extends Component<TRegisterComponentProps, IRegisterComponentState> {
  private checkBtn: CheckButton;
  private form: Form;
  constructor(props: TRegisterComponentProps) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      successful: false
    };
  }

  onChangeEmail(e: Input) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e: Input) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e: TRegisterComponentProps) {
    e.preventDefault();

    const { dispatch, history } = this.props

    this.setState({
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(register(this.state.email, this.state.password))
        .then(() => {
          this.setState({
            successful: true
          });
          history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          this.setState({
            successful: false
          });
        });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props

    if (isLoggedIn) {
      return <Redirect to="/profile"/>
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3 className={'text-center mb-4'}>{i18n.t('auth.sign_up')}</h3>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c: Form) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    {i18n.t('auth.field.password')}
                  </label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">
                    {i18n.t('auth.register_now')}
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? 'alert alert-success'
                      : 'alert alert-danger'
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c: CheckButton) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { message } = state.MessageReducer;
  return {
    message
  };
}

export default connect(mapStateToProps)(Register);
