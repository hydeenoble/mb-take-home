export const vpc = new sst.aws.Vpc("mightyByteVpc", { bastion: true, nat: "ec2" });

export const database = new sst.aws.Postgres("mightyByteDatabase", { 
    vpc,
    proxy: true,
    password: new sst.Secret("DB_PASSWORD").value,
    database: "tasks"
});