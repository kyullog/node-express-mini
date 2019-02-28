// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
const PORT = "2525";

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      req.cancel();
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}!`);
});
