import nats from "node-nats-streaming";

const stan = nats.connect("bookme", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: 123,
    name: "lbasda",
    cost: 232,
  });

  stan.publish("ticket:created", data, () => {
    console.log(`Event Published`);
  });
});
