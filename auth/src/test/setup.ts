import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

// Mongo Hook
beforeAll(async () => {
  // Set JWT environment variables
  process.env.JWT_KEY = "asdasdasdasdf";

  // Create a new MongoDB instance
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
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
