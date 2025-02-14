import { api } from './api';

export const site = new sst.aws.StaticSite("mightyByteFrontend", {
    path: "packages/frontend",
    build: {
        command: "npm run build",
        output: "dist"
      },
    environment: {
      VITE_API_URL: api.url, // Pass the API URL to the frontend
      VITE_SENTRY_DSN: new sst.Secret("MB_FRONTEND_SENTRY_DSN").value,
    },
  });