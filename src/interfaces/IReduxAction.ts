import { Action, AnyAction } from "redux";

export interface IReduxAction<T = any, ActionType = any> extends Action<ActionType> {
  payload: T;
  error?: any;
  meta: {
    previousAction: AnyAction
  };
}