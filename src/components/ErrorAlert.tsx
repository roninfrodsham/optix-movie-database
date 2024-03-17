import { Alert, Button } from "@mui/material";

type ErrorAlertProps = {
  error: Error;
  onRefresh: () => void;
};

const ErrorAlert = ({ error, onRefresh }: ErrorAlertProps) => {
  return (
    <Alert
      severity='error'
      action={
        <Button color='inherit' size='small' onClick={onRefresh}>
          Refresh Movies
        </Button>
      }
    >
      Error: {error.message}
    </Alert>
  );
};

export { ErrorAlert };
