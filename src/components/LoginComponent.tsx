import React, {Component, SyntheticEvent} from 'react'
import { Redirect } from 'react-router-dom'

// @ts-ignore
import Form from 'react-validation/build/form'
// @ts-ignore
import Input from 'react-validation/build/input'
// @ts-ignore
import CheckButton from 'react-validation/build/button'
import i18n from '../I18n'

import {connect, ConnectedProps} from 'react-redux'
import { login } from '../actions/AuthAction'
import {TRootState} from "../index";
import { history } from '../helpers/History';

const connector = connect(
  ({ AuthReducer, MessageReducer }: TRootState) => ({
    isLoggedIn: AuthReducer.isLoggedIn,
    message: MessageReducer.message,
  }),
  { login },
);
type TLoginProps = ConnectedProps<typeof connector>;

interface ILoginComponentState {
  email: string,
  password: string,
  loading: boolean
}

const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

class Login extends Component<TLoginProps, ILoginComponentState> {
  private form: Form;
  private checkBtn: CheckButton;

  constructor (props: TLoginProps) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  onChangeEmail (e: Input) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword (e: Input) {
    this.setState({
      password: e.target.value
    })
  }

  async handleLogin (e: SyntheticEvent) {
    e.preventDefault()

    this.setState({
      loading: true
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      await this.props.login(this.state.email, this.state.password)
        .then(() => {
          history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          this.setState({
            loading: false
          })
        })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    const { isLoggedIn, message } = this.props

    if (isLoggedIn) {
      return <Redirect to="/profile"/>
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3 className={'text-center mb-4'}>{i18n.t('auth.login')}</h3>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={(c: Form) => { this.form = c }}
          >
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
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
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>{i18n.t('auth.login')}</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c: CheckButton) => { this.checkBtn = c }}
            />
          </Form>
        </div>
      </div>
    )
  }
}

export default connector(Login);
