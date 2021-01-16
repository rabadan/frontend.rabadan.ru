import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {TRootState} from "../../index";
import {logout} from "../../actions/AuthAction";
import i18n from "../../I18n";
import {setConfiguration} from "../../actions/ConfigurationAction";

const connector = connect(
  ({ AuthReducer, ConfigurationReducer }: TRootState) => ({
    user: AuthReducer.user,
    configuration: ConfigurationReducer.configuration
  }),
  {logout, setConfiguration},
);
type TProfileProps = ConnectedProps<typeof connector>;

function ConfigurationFormList(props: any) {
  const configs = props.configuration;

  const listItems = Object.keys(configs).map(key =>
    <div className="form-row" key={`prop_${key}`}>
      <FieldForm data={configs[key]} field_name={key} setConfiguration={setConfiguration} />
    </div>
  )

  return (
    <div>
      <form>
        {listItems}
      </form>
    </div>
  );
}

function FieldForm(props:any) {
  const [data, setData] = useState('');

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleChange = (event:any) => {
    setData(event.target.value);
    props.setConfiguration(props.field_name, event.target.value)
  }

  return (
    <div className="col-12">
      <div className="input-group">
        <div className="input-group-text" style={{minWidth: '200px'}}>
          {props.field_name}
        </div>
        <input
          type="text"
          className="form-control"
          name="email"
          value={data}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

const ProfileComponent: React.FC<TProfileProps> = ({configuration, user, logout, setConfiguration}) => {
  const [listConfiguration, setListConfiguration] = useState(<div><i className="fas fa-spin fa-spinner" /></div>);

  useEffect(() => {
    if (user && user.is_admin) {
      setListConfiguration(
        <div className="container">
          <ConfigurationFormList configuration={configuration} />
        </div>
      );
    }
  }, [configuration, user]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <section className='section'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title"><h2>{user.name}</h2>
              <p>{user.email}</p>
              <a href={'/login'} className="nav-link pl-0" onClick={logout}>{i18n.t('auth.logout')}</a>
            </div>
          </div>
        </div>
      </div>

      {listConfiguration}
    </section>
  );
}

export default connector(ProfileComponent);