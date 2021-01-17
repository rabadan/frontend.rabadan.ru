import i18n from "../../I18n";
import React from "react";
// @ts-ignore
import { isEmail } from 'validator';

export const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        {i18n.t('errors.field_required')}
      </div>
    )
  }
}

export const email_validator = (value: string) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger py-0 px-2" role="alert">
        {i18n.t('errors.email_not_valid')}
      </div>
    );
  }
};
