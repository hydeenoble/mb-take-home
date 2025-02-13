import { database, vpc } from './storage';

export const api = new sst.aws.ApiGatewayV1("mb-api", {
  cors: false,
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
          DB_PORT: "5432",
          NODE_OPTIONS: "--import @sentry/aws-serverless/awslambda-auto",
          SENTRY_DSN: new sst.Secret("API_SENTRY_DSN").value,
          SENTRY_TRACES_SAMPLE_RATE: "1.0"
        };

        args.vpc = {
          privateSubnets: vpc.privateSubnets,
          securityGroups: vpc.securityGroups
        };

        args.nodejs = {
          sourcemap: true,
          install: ["@sentry/aws-serverless", "@sentry/profiling-node"],
          // loader: {
          //   ".node": "file", // Configure loader for .node files
          // }
        };

      }
    }
  }
});

api.route("GET /", "packages/functions/src/handlers/getTasks.handler");
api.route("POST /", "packages/functions/src/handlers/createTask.handler");

api.deploy();