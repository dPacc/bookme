import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

jest.mock("../nats-wrapper");
declare global {
  var signin: () => string[];
}

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
  jest.clearAllMocks();
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

// Emulate sign in
global.signin = () => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object (Take generate JWT and assign it to an obj with key "jwt")/ {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
