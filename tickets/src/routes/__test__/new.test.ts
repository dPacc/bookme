import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  // Send empty title
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 23,
    })
    .expect(400);

  // Dont send title
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 23,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  // Send negative price
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asdaw",
      price: -23,
    })
    .expect(400);

  // Dont send price
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "qfsdf",
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  // TODO: Add in a check to make sure the ticket was saved

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "wutt",
      price: 45,
    })
    .expect(200);
});
