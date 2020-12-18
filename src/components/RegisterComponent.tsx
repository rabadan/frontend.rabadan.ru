import React, {ChangeEvent, FormEvent, useState} from 'react';
// @ts-ignore
import Form from 'react-validation/build/form';
// @ts-ignore
import Input from 'react-validation/build/input';
// @ts-ignore
import CheckButton from 'react-validation/build/button';
// @ts-ignore
import { isEmail } from 'validator';

import {connect, ConnectedProps} from 'react-redux';
import { register } from '../actions/AuthAction';
import i18n from '../I18n';
import {Redirect} from "react-router-dom";
import {TRootState} from "../index";
import { history } from '../helpers/History';

const connector = connect(
  ({ MessageReducer, AuthReducer }: TRootState) => ({
    isLoggedIn: AuthReducer.isLoggedIn,
    message: MessageReducer.message,
  }),
  { register },
);
type TRegisterProps = ConnectedProps<typeof connector>;

const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger py-0 px-2" role="alert">
        {i18n.t('errors.field_required')}
      </div>
    );
  }
};

const email_validator = (value: string) => {
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
        {i18n.t('errors.password_bad')}
      </div>
    );
  }
};

const RegisterComponent: React.FC<TRegisterProps> = ({message, isLoggedIn, register}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [successful, setSuccessful] = useState<boolean>(false);

  let form: Form;
  let checkBtn: CheckButton;

  if (isLoggedIn) {
    return <Redirect to="/profile"/>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSuccessful(false)

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      register(email, password)
        .then(() => {
          setSuccessful(true)
          history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          setSuccessful(false)
        });
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
        <h3 className={'text-center mb-4'}>{i18n.t('auth.sign_up')}</h3>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleSubmit} ref={(c: Form) => { form = c }}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, email_validator]}
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
              <div className={ successful ? 'alert alert-success' : 'alert alert-danger' } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{display: 'none'}}
            ref={(c: CheckButton) => { checkBtn = c }}
          />
        </Form>
      </div>
    </div>
  );
}

export default connector(RegisterComponent);
