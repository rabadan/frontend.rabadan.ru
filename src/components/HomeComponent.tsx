import React, {useEffect, useState} from 'react';
import UserRequest from "../requests/UserRequest";
import {TError} from "../interfaces/IError";

interface IHomeComponentState {
  h1: string,
  body: string
}

const HomeComponent: React.FC = () => {
  const [h1, setH1] = useState<string>('');
  const [body, setBody] = useState<string>('');

  useEffect(() => {
    UserRequest.index().then(
      (response: IHomeComponentState) => {
        setH1(response.h1)
        setBody(response.body)
      },
      (error: TError) => {
        setH1('ERROR')
        setBody(error.description)
      }
    )
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>{h1}</h1>
        <p>{body}</p>
      </header>
    </div>
  );
};

export default HomeComponent;