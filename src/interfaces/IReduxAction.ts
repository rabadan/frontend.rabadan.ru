import { Action, AnyAction } from "redux";

export default interface IReduxAction<T = any, ActionType = any> extends Action<ActionType> {
  payload: { data: T };
  error?: any;
  meta: {
    previousAction: AnyAction
  };
}