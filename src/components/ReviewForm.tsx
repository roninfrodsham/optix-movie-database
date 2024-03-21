import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { H2, FormContainer } from "./StyledComponents";
import { Movie } from "../types";

type ReviewFormProps = {
  selectedMovieId: number | null;
  movies: Movie[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  responseMessage: string | null;
};

const ReviewForm = ({ selectedMovieId, movies, handleSubmit, responseMessage }: ReviewFormProps) => {
  const [review, setReview] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (review === "") return;
    await handleSubmit(event);
    setReview("");
  };

  return (
    <>
      <H2>Movie Review</H2>
      {responseMessage !== null ? <p>{responseMessage}</p> : null}
      {selectedMovieId !== null ? (
        <FormContainer>
          <p>Please leave a review '{movies.find((movie) => movie.id === selectedMovieId)?.title}' below:</p>
          <form onSubmit={handleFormSubmit}>
            <TextField
              id='outlined-multiline-static'
              name='review'
              label='Review'
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
              sx={{ width: "100%", marginBottom: "1em" }}
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />
            <Button variant='contained' type='submit'>
              Submit Review
            </Button>
          </form>
        </FormContainer>
      ) : (
        <p>Click on a movie to in the table above leave a review.</p>
      )}
    </>
  );
};

export { ReviewForm };
