import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/Types';
import IReduxAction from "../interfaces/IReduxAction";

interface IMessageReducer {
  message?: any,
}

const initialState: IMessageReducer = {
  message: ''
};

// eslint-disable-next-line
export default function (state = initialState, action: IReduxAction): IMessageReducer {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { message: payload.data };

    case CLEAR_MESSAGE:
      return { message: '' };

    default:
      return state;
  }
}
