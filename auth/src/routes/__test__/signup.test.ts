import request from "supertest";
import { app } from "../../app";

// Test signup
it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

// Test invalid email
it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testasdtest",
      password: "password",
    })
    .expect(400);
});

// Test invalid password
it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "p",
    })
    .expect(400);
});

// Test invalid email and password
it("returns a 400 with an invalid email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "abcd1234",
    })
    .expect(400);
});
