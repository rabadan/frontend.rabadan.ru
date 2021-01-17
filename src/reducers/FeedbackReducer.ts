import {
  FEEDBACK_CREATE,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAIL,
} from '../actions/Types';

import {IReduxAction} from "../interfaces/IReduxAction";

export interface IFeedbackReducer {
  apiLoading: boolean;
}

const initialState: IFeedbackReducer = {
  apiLoading: false
}

export default function FeedbackReducer(state = initialState, action: IReduxAction): IFeedbackReducer {
  const { type } = action;

  switch (type) {
    case FEEDBACK_CREATE:
      return {
        ...state,
        apiLoading: true,
      };
    case FEEDBACK_CREATE_SUCCESS:
      return {
        ...state,
        apiLoading: false,
      };
    case FEEDBACK_CREATE_FAIL:
      return {
        ...state,
        apiLoading: false,
      };
    default:
      return state;
  }
}
