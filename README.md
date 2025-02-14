# SRE Coding Exercise: Deploy and Monitor a Serverless Application


This project uses the [official SST v3 monorepo template](https://sst.dev/docs/set-up-a-monorepo) to create a monorepo SST v3 project.

## Set Instruction

1. Clone the repo
   ```bash
   clone command
   ```
2. Install Dependcies

   ```bash
   npm install
   ```

4. Deploy Locally

   ```bash
   npx sst deploy
   ```

> NOTE  
> Before testing, you need to manage the DB migrations with the commands before (You only need to run it only once except there are changes to the migration)

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
curl https://4h6vusgz1k.execute-api.us-east-2.amazonaws.com/stage/tasks
```

2. POST /tasks

```bash
curl -H 'Content-Type: application/json' -d '{ "description":"This the first tasks" }' -X POST https://4h6vusgz1k.execute-api.us-east-2.amazonaws.com/stage/tasks

```

## Additional Links


## Folder Structure

1. `packages/core/`

   It is referenced from other packages like this: 

   ```ts
   import * as schema from "../../../core/src/migrations/tasks";
   ```

2. `functions/`

   This holds the `createTask` and `getTasks` functions

### Infrastructure

The `infra/` directory holds all the needed infrastructure logically broken down into separate files.

## Possible Improvement
1. Implement Deploy with CICD (Github Action).
2. Improve Application Perfomance
