import {Dispatch} from "redux";
import FeedbackRequest from "../requests/FeedbackRequest";
import {IFeedback} from "../interfaces/IFeedback";
import {
  FEEDBACK_CREATE,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAIL,
  SET_MESSAGE,
} from './Types';

export const create = (formData: IFeedback) => (dispatch: Dispatch) => {
  dispatch({ type: FEEDBACK_CREATE });

  return FeedbackRequest.create(formData).then(
    (result) => {
      dispatch({ type: FEEDBACK_CREATE_SUCCESS });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: FEEDBACK_CREATE_FAIL });
      dispatch({ type: SET_MESSAGE, payload: error.description });
      return Promise.reject();
    }
  );
};
