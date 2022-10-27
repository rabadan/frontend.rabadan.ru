import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../index";
import {getBlog} from "../actions/BlogAction";
import i18n from '../I18n';
import LangButtonsComponent from "./LangButtonsComponent";

const connector = connect(
  ({PageReducer, ConfigurationReducer}: TRootState, {match}: any) => ({
    page: PageReducer.page,
    lang: ConfigurationReducer.lang,
    slug: match.params.slug
  }),
  {getBlog}
);

type TPageEditProps = ConnectedProps<typeof connector>;

const PageEditComponent: React.FC<TPageEditProps> = ({slug}) => {
  return (
    <div className='container'>
      <div>
        <h1 className='d-flex'>
          {i18n.t('actions.edit_page')} "{slug}"
          <span className='m-3' style={{height: '23px'}}>
            <LangButtonsComponent/>
          </span>
        </h1>
      </div>
    </div>
  );
}

export default connector(PageEditComponent);