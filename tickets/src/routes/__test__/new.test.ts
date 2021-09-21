import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

// Test if route exists
it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

// Test authorized user
it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

// Test other status code if user signed in
it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

// Test title in ticket
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

// Test price in ticket
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

// Test new ticket create
it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "asdfgkjf";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual(title);
});
