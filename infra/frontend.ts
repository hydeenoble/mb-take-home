import { api } from './api';

export const site = new sst.aws.StaticSite("mb-frontend", {
    path: "packages/frontend",
    build: {
        command: "npm run build",
        output: "dist"
      },
    environment: {
      VITE_API_URL: api.url, // Pass the API URL to the frontend
      SENTRY_DSN: new sst.Secret("FRONTEND_SENTRY_DSN").value,
    },
  });