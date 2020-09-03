const express = require('express');
const path = require("path");
const app = express();
const fs = require('fs');
const port = 8080;

app.use(express.json());

const auth_config = {
    redirect_uri: "http://localhost:8080/data", // change this for your app
    client_id: "cd2b0916d4b5f1df11d0f5da6128500333f3d67f4d758eb46ee9d90a1c4e7b3b",
    scope: "read_user openid profile email", // This should be enough
    response_type: "token",
  };

  app.get("/", (req, res) => {
      res.send('Pokemon Spotter Server API');
  })

// Don't know if this should be here or in the other project
  app.get("/api/v1/login", (req, res) => {
    res.redirect(
      `https://gitlab.com/oauth/authorize?${new URLSearchParams(
        auth_config
      ).toString()}`
    );
  });

  // GET    all users
  app.get("/api/v1/users", (req, res) => {
      // Does it send back a json object?
      // Should it send back a status message?
    fs.readFile(__dirname + '/data.json', 'utf-8', (err, content) => {
        if (err) {
            console.log(err);
        } else {
            res.send(content);
        }
    })
  });

  // GET    specific user
  app.get(`/api/v1/users/:id`, (req, res) => {
      //    Not done! Doesn't work..
    fs.readFile(__dirname + '/data.json', 'utf-8', (err, content) => {
        if (err) {
            console.log(err);
        } else {
            users = JSON.parse(content);
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == req.query.id) {
                    res.send(users[i]);
                }
            }
        }
        res.send('No user found with that id..');
    })
  });

  // POST   user
  app.post("/api/v1/users", (req, res) => {
      //    Not done! Not tested!
      // Add validation for correct request body
      const user = JSON.parse(req.body);
      return res.status(201).json(user);
  }) 

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  