const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const sequelize = db.sequelize;
const Role = db.role;
const app = express();
const config = require("./config/config");
const User = db.user;
const Product = db.product;

const SERVER_PORT = process.env.PORT || config.SERVER_PORT;
const CLIENT_PORT = config.CLIENT_PORT;

const corsOptions = {
  origin: [`http://localhost:${SERVER_PORT}`, `http://localhost:${CLIENT_PORT}`],
};

// uncomment below code-lines to initialize DB on each server run.
sequelize.sync({ force: true  }).then(() => {
  console.log("Drop and resync DB");
  init();
});

function init() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });

  User.create({
    id: 1,
    username: "admin",
    password: "$2a$12$i3bTb0it.p36f8hBeShpGeoo7SEkCXstcHr1lRLVjwLXUxL0qWFHa",
    roles: ["admin"]
  }).then(user => user.setRoles([2]))

  Product.create({
    user: 1,
    name: "Abc"
  })
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require("./routes/auth.routes")(app);
require("./routes/loggedIn.routes")(app);

app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));
