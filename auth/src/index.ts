import express from "express";

// Create the app instance
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Run the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});