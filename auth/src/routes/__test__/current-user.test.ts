import request from "supertest";
import { app } from "../../app";
import { signup } from "../../utils/signup";

// Test for current user
it("responds with details of the current user", async () => {
  const cookie = await signup();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@gmail.com");
});

// Test if not signed in return null
it("responds with null if not signed in", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
