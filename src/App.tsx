const api_url = import.meta.env.VITE_API_URL;

export const App = () => {
  console.log(api_url);
  return (
    <div>
      <h1>Welcome to the Movie Database!</h1>
    </div>
  );
};
