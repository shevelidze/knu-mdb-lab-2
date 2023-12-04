const { Connection } = require("postgresql-client");
const { MongoClient } = require("mongodb");

const postgresConnection = new Connection({
  host: "localhost",
  port: 5435,
  user: "root",
  password: "root",
  database: "test",
});

const mongoClient = new MongoClient("mongodb://root:root@localhost:27017/test");

async function fetchDataFromMongoDB() {
  const db = mongoClient.db("test");
  const collection = db.collection("mobileAppBuilds");

  await collection.find({ platform: "ios" }).toArray();
}

async function fetchDataFromPostgreSQL() {
  await postgresConnection.query(
    `SELECT version, platform, created_at, rating FROM mobile_application_builds mab
    INNER JOIN mobile_application_ratings mar ON mab.id = mar.build_id where mab.platform = 'ios'`
  );
}

async function calculateAsyncFunctionExecutionTime(fn) {
  const start = Date.now();

  return fn().then(() => Date.now() - start);
}

async function main() {
  await Promise.all([postgresConnection.connect(), mongoClient.connect()]);

  const [mongoDBExecutionTime, postgresExecutionTime] = await Promise.all([
    calculateAsyncFunctionExecutionTime(fetchDataFromMongoDB),
    calculateAsyncFunctionExecutionTime(fetchDataFromPostgreSQL),
  ]);

  console.log(`MongoDB execution time: ${mongoDBExecutionTime}ms`);
  console.log(`PostgreSQL execution time: ${postgresExecutionTime}ms`);

  await Promise.all([mongoClient.close(), postgresConnection.close()]);
}

main();
