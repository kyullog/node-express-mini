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

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    db.insert(user)
      .then(response => res.status(200).json(response))
      .catch(err => {
        req.cancel();
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}!`);
});
