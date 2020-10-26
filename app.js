const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const indexRoute = require("./routes/index");
const app = express();

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true },
  () => console.log("DB connection established")
);

// parse application/json
app.use(express.json());

app.use("/user", authRoute);
app.use("/home", indexRoute);

app.listen(process.env.PORT, () =>
  console.log("listening on port ", process.env.PORT)
);
