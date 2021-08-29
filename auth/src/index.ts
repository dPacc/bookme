import mongoose from "mongoose";
import { app } from "./app";

const port = process.env.PORT || 3000;

// Connect to the database
mongoose
  .connect("mongodb://auth-mongo-srv:27017/auth", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error - ${err}`));

// Run the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
