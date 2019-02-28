// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
const PORT = "2525";

server.use(express.json());

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}!`);
});
