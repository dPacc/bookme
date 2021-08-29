import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

// Mongo Hook
beforeAll(async () => {
  // Create a new MongoDB instance
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// A hook that runs before all tests in the suite
beforeEach(async () => {
  // Drop the database before each test
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Now stop the mongo server
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
