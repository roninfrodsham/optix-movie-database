import { Button, TextField } from "@mui/material";
import { H2, FormContainer } from "./StyledComponents";
import { Movie } from "../types";

type ReviewFormProps = {
  selectedMovieId: number | null;
  movies: Movie[];
};

const ReviewForm = ({ selectedMovieId, movies }: ReviewFormProps) => {
  return (
    <>
      <H2>Movie Review</H2>
      {selectedMovieId !== null ? (
        <FormContainer>
          <p>Please leave a review '{movies.find((movie) => movie.id === selectedMovieId)?.title}' below:</p>
          <form>
            <TextField
              id='outlined-multiline-static'
              label='Review'
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
              sx={{ width: "100%", marginBottom: "1em" }}
            />
            <Button variant='contained' type='submit'>
              Submit Review
            </Button>
          </form>
        </FormContainer>
      ) : (
        <p>Click on a movie to in the table above leave a review</p>
      )}
    </>
  );
};

export { ReviewForm };
