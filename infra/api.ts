import { database, vpc } from './storage';

const sentry_dns = new sst.Secret("MB_SENTRY_DSN");

export const api = new sst.aws.ApiGatewayV1("mightyByteApi", {
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
          SENTRY_DSN: sentry_dns.value,
        };

        args.vpc = {
          privateSubnets: vpc.privateSubnets,
          securityGroups: vpc.securityGroups
        };

        args.nodejs = {
          sourcemap: true,
          install: ["@sentry/aws-serverless", "@sentry/profiling-node"],
        };

      }
    }
  }
});

api.route("GET /tasks", "packages/functions/src/handlers/getTasks.handler");
api.route("POST /tasks", "packages/functions/src/handlers/createTask.handler");

api.deploy();