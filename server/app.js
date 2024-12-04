const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const PORT = process.env.PORT;

const server = () => {
  db();
  app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
};

server();
