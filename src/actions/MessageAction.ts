import {SET_MESSAGE, CLEAR_MESSAGE} from './Types';
import {Dispatch} from "redux";

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message
});

export function clearMessage() {
  return (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_MESSAGE })
  }
}