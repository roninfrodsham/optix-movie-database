import { ReviewState, ReviewAction, ActionTypes } from "../types";

const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
  switch (action.type) {
    case ActionTypes.SET_REVIEW:
      return { ...state, review: action.payload };
    case ActionTypes.CLEAR_REVIEW:
      return { ...state, review: "" };
    case ActionTypes.SET_SELECTED_MOVIE:
      return { ...state, selectedMovieId: action.payload };
    case ActionTypes.CLEAR_SELECTED_MOVIE:
      return { ...state, selectedMovieId: null };
    default:
      return state;
  }
};

export { reviewReducer };
