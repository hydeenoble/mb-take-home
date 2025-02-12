export const vpc = new sst.aws.Vpc("mb-vpc");

export const database = new sst.aws.Postgres("mb-db", { 
    vpc,
    password: new sst.Secret("DB_PASSWORD").value,
    database: "tasks"
});