db = connect("mongodb://localhost/test");

db.createUser({
  user: "root",
  pwd: "root",
  roles: [{ role: "readWrite", db: "test" }],
  passwordDigestor: "server",
});

db.createCollection("mobileAppBuilds");

db.mobileAppBuilds.insertMany([
  {
    version: "1.0.0",
    platform: "ios",
    createdAt: new Date(),
    ratings: [2, 3, 2],
  },
  {
    version: "1.0.0",
    platform: "android",
    createdAt: new Date(),
    ratings: [5, 4, 5],
  },
  {
    version: "1.0.1",
    platform: "ios",
    createdAt: new Date(),
    ratings: [3, 4, 5],
  },
  {
    version: "1.0.1",
    platform: "android",
    createdAt: new Date(),
    ratings: [3, 3, 5],
  },
]);
