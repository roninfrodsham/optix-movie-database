import { ReviewState, ReviewAction, ActionTypes } from "../types";

const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
  switch (action.type) {
    case ActionTypes.SET_REVIEW:
      return { ...state, review: action.payload };
    case ActionTypes.SET_SELECTED_MOVIE:
      return { ...state, selectedMovieId: action.payload };
    case ActionTypes.RESET_REVIEW_STATE:
      return { ...state, review: "", selectedMovieId: null };
    default:
      return state;
  }
};

export { reviewReducer };
