import React, {ChangeEvent, FormEvent, useState} from 'react'
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

const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        {i18n.t('errors.field_required')}
      </div>
    )
  }
}


const LoginComponent: React.FC<TLoginProps> = ({message, isLoggedIn, login}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (isLoggedIn) {
    return <Redirect to="/profile"/>
  }

  let form: Form;
  let checkBtn: CheckButton;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    form.validateAll()

    if (checkBtn.context._errors.length === 0) {
      login(email, password)
        .then(() => {
          history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h3 className={'text-center mb-4'}>{i18n.t('auth.login')}</h3>
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
              disabled={loading}
            >
              {loading && (
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
            ref={(c: CheckButton) => { checkBtn = c }}
          />
        </Form>
      </div>
    </div>
  )
}

export default connector(LoginComponent);
