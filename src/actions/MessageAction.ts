import {SET_MESSAGE, CLEAR_MESSAGE} from './Types';

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message
});

export function clearMessage() {
  return (dispatch: any) => {
    dispatch({ type: CLEAR_MESSAGE })
  }
}