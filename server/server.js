const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const sequelize = db.sequelize;
const Role = db.role;
const app = express();

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: [`http://localhost:${PORT}`, "http://localhost:3000"],
};

// uncomment below code to initialize DB on each server run.
/*
sequelize.sync({ force: true }).then(() => {
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
}
*/

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require("./routes/auth.routes")(app);
require("./routes/loggedIn.routes")(app);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
