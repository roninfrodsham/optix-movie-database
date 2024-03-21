import { useCallback } from "react";
import { ActionTypes, AppState, AppAction } from "../types";

type SubmitReviewHandler = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;

const useSubmitReview = (
  appState: AppState,
  appDispatch: React.Dispatch<AppAction>,
  api_url: string
): SubmitReviewHandler => {
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      const review = event.currentTarget.review.value;

      if (appState.selectedMovieId !== null) {
        try {
          const response = await fetch(`${api_url}/submitReview`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movieId: appState.selectedMovieId,
              review: review,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          appDispatch({ type: ActionTypes.SUBMIT_SUCCESS, payload: data.message });
        } catch (error) {
          if (error instanceof Error) {
            appDispatch({ type: ActionTypes.FETCH_FAILURE, payload: error });
          } else {
            appDispatch({ type: ActionTypes.FETCH_FAILURE, payload: new Error(String(error)) });
          }
        }
      }
    },
    [appState, appDispatch, api_url]
  );

  return handleSubmit;
};

export { useSubmitReview };
