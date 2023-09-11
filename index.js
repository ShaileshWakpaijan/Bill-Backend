const connectToMongo = require("./db");
const cors = require("cors");
const { config } = require("dotenv");

const express = require("express");
const app = express();

config({
  path: "./config.env",
});
connectToMongo();

app.use(
  cors(
    {
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
  )
);
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/item", require("./routes/item"));
app.use("/api/collection", require("./routes/collection"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening`);
});
