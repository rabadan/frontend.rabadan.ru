import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

// @ts-ignore
import Form from 'react-validation/build/form'
// @ts-ignore
import Input from 'react-validation/build/input'
// @ts-ignore
import CheckButton from 'react-validation/build/button'
import i18n from '../../I18n'

import {connect, ConnectedProps} from 'react-redux'
import {login, login_with_facebook, login_with_google} from '../../actions/AuthAction'
import {TRootState} from "../../index";
// @ts-ignore
import FacebookLogin from 'react-facebook-login';
import VkAuth from "./VkAuth";
import GoogleLogin from 'react-google-login';
import setAuthorizationToken from "../../services/setAuthorizationToken";

const FB_CLIENT_ID = process.env.REACT_APP_FACEBOOK_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const connector = connect(
  ({ AuthReducer, MessageReducer }: TRootState) => ({
    apiLoading: AuthReducer.apiLoading,
    isLoggedIn: AuthReducer.isLoggedIn,
    message: MessageReducer.message,
  }),
  { login, login_with_facebook, login_with_google },
);
type TLoginProps = ConnectedProps<typeof connector>;

const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        {i18n.t('errors.field_required')}
      </div>
    )
  }
}

const LoginComponent: React.FC<TLoginProps> = ({message, apiLoading, isLoggedIn, login, login_with_google, login_with_facebook}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (isLoggedIn) {
    return <Redirect to="/profile"/>
  }

  let form: Form;
  let checkBtn: CheckButton;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.validateAll()

    if (checkBtn.context._errors.length === 0) {
      login(email, password)
        .then(() => {
          setAuthorizationToken(localStorage.jwtToken)
          window.location.assign('/profile')
        })
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-md-1">
      </div>
      <div className="col-md-5">
        <div className="card card-container">
          <h3 className={'text-center mb-4'}>{i18n.t('auth.login_email')}</h3>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form ref={(c: Form) => { form = c }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
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
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={apiLoading}
              >
                {apiLoading && (
                  <span className="spinner-border spinner-border-sm" />
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
              ref={(c: CheckButton) => { checkBtn = c }}
            />
          </Form>

          <hr />

          <p>{i18n.t('auth.not_account')}</p>
          <Link to={'/register'} className="btn btn-success">
            {i18n.t('auth.sign_up')}
          </Link>
        </div>
      </div>
      <div className="col-md-5">
        <div className="card card-container">
          <h3 className={'text-center mb-4'}>{i18n.t('auth.login_social_networks')}</h3>

          <FacebookLogin
            appId={FB_CLIENT_ID}
            autoLoad={false}
            fields="name,email,picture"
            cssClass="btn btn-primary btn-block"
            icon="fa-facebook px-2"
            textButton={i18n.t('auth.login_facebook')}
            callback={login_with_facebook} />

          <VkAuth />

          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID as string}
            className='mt-3'
            buttonText={i18n.t('auth.login_google')}
            onSuccess={login_with_google}
            onFailure={responseFailureGoogle}
          />
        </div>
      </div>
    </div>
  )
}


const responseFailureGoogle = (response: any) => {
  console.log('responseFailureGoogle', response);
}

export default connector(LoginComponent);
