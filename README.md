# SRE Coding Exercise: Deploy and Monitor a Serverless Application

This project uses the [official SST v3 monorepo template](https://sst.dev/docs/set-up-a-monorepo) to create a monorepo SST v3 project. This project uses [SST v3](https://sst.dev/) to manage the different components (Backend, Frontend and Infrastructure).

## Prerequisites
* Install Node  (This application was tested with node version `v23.7.0`)
* Install SST v3 (Optional)
* Install AWS CLI
* Configure AWS Credentials with appropraite permissions (This application creates RDS, AWS Lambda, API Gateway and S3). 

## Setup Instruction

1. Clone the repo
   ```bash
   git clone https://github.com/hydeenoble/mb-take-home.git
   ```
2. Install Dependcies

   ```bash
   cd mb-take-home
   npm install
   ```

3. Create Secrets in SST

   ```bash
   npx sst secret set DB_PASSWORD <db password>
   npx sst secret set MB_FRONTEND_SENTRY_DSN <sentry dns for frontend application>
   npx sst secret set MB_SENTRY_DSN <sentry dns for serverless application>
   ```

4. Run Locally

   ```bash
   npx sst dev
   ```

> **NOTE**: Before testing, you need to manage the DB migrations with the commands below (You only need to run it only once except there are changes to the migration)

5. Generate a migration

   We can use this to generate a migration.

   ```bash
   npm run db generate
   ```
6. Apply the migration
   
   Now we can apply our migration using.
   ```bash
   npm run db migrate
   ```

## Testing: Curl Command

1. GET /tasks

```bash
curl https://<API Gateway URL>/stage/tasks
```

2. POST /tasks

```bash
curl -H 'Content-Type: application/json' -d '{ "description":"This the first tasks" }' -X POST https://<API Gateway URL>/stage/tasks
```

## Deploy your app

> Repeat steps 3, 5 and 6 from the `Setup Instruction` section.

> TIP: You need a tunnel to connect to your database (during migration). You can run the command below to ensure connection: 

```bash
npx sst tunnel --stage stage 
```

### Deploy to `stage` stage

```bash
npx sst deploy --stage stage
```

## Additional Links

1. Sentry
   
   * [Frontend](https://sentry.io/organizations/mightybyte-gv/projects/mb-frontend/?project=4508817680433152) 

   * [Serverless Application](https://sentry.io/organizations/mightybyte-gv/projects/serverless/?project=4508807825260544)

2. [Splunk](https://prd-p-duoeh.splunkcloud.com/en-US/app/search/search?q=search%20source%3D%22us-east-2%3AAWS%2FApiGateway%22%20OR%20source%3D%22us-east-2%3AAWS%2FLambda%22%20OR%20source%3D%22us-east-2%3AAWS%2FRDS%22&display.page.search.mode=smart&dispatch.sample_ratio=1&workload_pool=&earliest=-15m&latest=now&sid=1739576062.3943)

3. [CloudWatch](https://cloudwatch.amazonaws.com/dashboard.html?dashboard=MightyByte&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTUwOTM5OTU5OTY4OCIsIlUiOiJ1cy1lYXN0LTFfQzVwWmZubGI4IiwiQyI6IjE0NDk0N2lpNXFrOXNmOHVrdmpxaGlxZWtrIiwiSSI6InVzLWVhc3QtMToyMmVmMjE4NC01NDY3LTRmOTMtODhkMi0xMTdiMTU0NWU0ZDAiLCJNIjoiUHVibGljIn0=)
   
4. [Alarms](https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#alarmsV2:?~(selectedIds~(~'Error*20with*20Get*20Tasks*20Function)))

## Folder Structure

1. `packages/core/`

   It is referenced from other packages like this: 

   ```ts
   import * as schema from "../../../core/src/migrations/tasks";
   ```

2. `packages/functions/`

   This holds the `createTask` and `getTasks` functions. This folder also holds the unit test for these functions and you can run the test with the command below from the root folder. 

   ```bash
   npm test
   ```

3. `packages/frontend/`
   This holds the frontend code written in react and managed with vite. 

### Infrastructure

The `infra/` directory holds all the needed infrastructure logically broken down into separate files.

## Possible Improvement
1. Implement deployment with CICD (Github Action).
2. Security: Add authentication on the API Gateway.
3. Secret will managed external with AWS SSM. 
