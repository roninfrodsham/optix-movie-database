# Optix Tech Test - Movie Database

### API environment variable

I have added an `.env` file in the project purely for convenience. The VITE environment variable exposes the VITE_API_URL to the application so it's easy for anyone to point to the api without editing the code.

In my case it's set to the following but update VITE_API_URL to your API url:

```
VITE_API_URL=http://localhost:3000
```

### Run locally in development mode:

```
npm run dev
```

### Preview production build locally

```
npm run build
npm run preview
```

### Todos

I have focused on getting the application working as requested and I have left a few comments in the code of things I want to look at to make the code easier to follow and maintain.

I have four issues remaining in my project:

- Add jest and unit testing
- Optimisation
- Refinements
- Dockerise and deploy
