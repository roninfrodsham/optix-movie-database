import { Alert, Button } from "@mui/material";

type ErrorAlertProps = {
  error: Error;
  refreshMovies: () => void;
};

const ErrorAlert = ({ error, refreshMovies }: ErrorAlertProps) => {
  return (
    <Alert
      severity='error'
      action={
        <Button color='inherit' size='small' onClick={refreshMovies}>
          Refresh Movies
        </Button>
      }
    >
      Error: {error.message}
    </Alert>
  );
};

export { ErrorAlert };
