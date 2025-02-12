import { database, vpc } from './storage';

export const api = new sst.aws.ApiGatewayV1("mb-api", {
  transform: {
    route: {
      handler: (args, opts) => {
        // Set the default if it's not set by the route
        args.memory ??= "2048 MB";

        args.environment = {
          DB_HOST: database.host,
          DB_USER: database.username,
          DB_PASSWORD: database.password,
          DB_NAME: database.database,
          DB_PORT: "5432"
        };

        args.vpc = {
          privateSubnets: vpc.privateSubnets,
          securityGroups: vpc.securityGroups
        }

      }
    }
  }
});

api.route("GET /", "packages/functions/src/handlers/getTasks.handler");
api.route("POST /", "packages/functions/src/handlers/createTask.handler");

api.deploy();