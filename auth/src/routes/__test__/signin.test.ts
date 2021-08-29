import request from "supertest";
import { app } from "../../app";

// Test for email doesnt exist
it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "password",
    })
    .expect(400);
});

// Test signin to account with incorrect password
it("fails when a password that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "passwAsd",
    })
    .expect(400);
});

// Test if cookie is set after signin
it("sets a cookie after successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
