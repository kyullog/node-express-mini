// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
const PORT = "2525";

server.use(express.json());

//Get all users endpoint DONE
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

//Get user by ID endpoint DONE
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

//Add user POST endpoint DONE
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    db.insert(user)
      .then(response => res.status(201).json(response))
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

//Delete user by ID endpoint DONE
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json("User deleted");
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => res.json({ err }));
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}!`);
});
