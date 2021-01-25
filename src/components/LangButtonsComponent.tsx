import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {setConfigurationLang} from "../actions/ConfigurationAction";

const connector = connect(
  () => ({}),
  {setConfigurationLang},
);

type TLangButtonsProps = ConnectedProps<typeof connector>;

const LangButtonsComponent: React.FC<TLangButtonsProps> = ({setConfigurationLang}) => {
  function setLang(new_lang: string) {
    return function (p1: React.MouseEvent<SVGSVGElement>) {
      setConfigurationLang(new_lang);
    };
  }

  console.log('props')

  return (
    <div className="d-flex justify-content-center" style={{height: '100%'}}>
      <svg onClick={setLang('ru')} className="select-lang-button lang-ru" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 9 6">
        <rect fill="#fff" width="9" height="3"/>
        <rect fill="#d52b1e" y="3" width="9" height="3"/>
        <rect fill="#0039a6" y="2" width="9" height="2"/>
      </svg>
      <svg onClick={setLang('en')} className="select-lang-button lang-en" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 60 30">
        <clipPath id="a">
          <path d="M0 0v30h60V0z"/>
        </clipPath>
        <clipPath id="b">
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z"/>
        </clipPath>
        <g clipPath="url(#a)">
          <path d="M0 0v30h60V0z" fill="#012169"/>
          <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
          <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    </div>
  );
}

export default connector(LangButtonsComponent);