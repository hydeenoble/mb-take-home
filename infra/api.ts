import { database } from './storage';


export const api = new sst.aws.ApiGatewayV1("mb-api", {
  transform: {
    route: {
      handler: (args, opts) => {
        // Set the default if it's not set by the route
        args.memory ??= "2048 MB";

        args.environment = {
          APP_NAME: "Idowu env",
          DB_HOST: database.host,
          DB_USER: database.username,
          DB_PASSWORD: database.password,
          DB_NAME: database.database,
          DB_PORT: "5432"
        }
      }
    }
  }
});

api.route("GET /", "packages/functions/src/handlers/getTasks.handler");
// api.route("POST /", "src/post.handler");
api.deploy();