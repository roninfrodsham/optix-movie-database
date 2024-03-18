import { ApiState, ApiAction, ActionTypes } from "../types";

const apiReducer = (state: ApiState, action: ApiAction): ApiState => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        movies: action.payload.movies,
        movieCompanies: action.payload.movieCompanies,
      };
    case ActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.SUBMIT_SUCCESS:
      return { ...state, responseMessage: action.payload };
    case ActionTypes.CLEAR_RESPONSE_MESSAGE:
      return { ...state, responseMessage: null };
    default:
      return state;
  }
};

export { apiReducer };
