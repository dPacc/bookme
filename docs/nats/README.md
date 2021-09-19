# NATS - Streaming Server

**NATS** and **NATS Streaming Server** are two different things.

### What is NATS?

NATS is an open-source, cloud-native, high-performance messaging system. At its core, it’s a Publish/Subscribe (PubSub) system whereby clients can communicate with one another without knowledge of where services are located or what their precise endpoints are. Clients simply publish/subscribe to a subject and NATS takes full responsibility for routing the messages.

NATS is a “send-and-pray” type system: if a message is sent but the intended client recipient(s) is not connected to the server, the **message is lost**.

### What is NATS Streaming (aka STAN)?

Where NATS provides at most once quality of service, streaming adds at least once. Streaming is implemented as a request-reply service on top of NATS.

In other words, **NATS Streaming introduces message persistence & message delivery guarantees**.

(**Reference**: <https://gcoolinfo.medium.com/comparing-nats-nats-streaming-and-nats-jetstream-ec2d9f426dc8>)
