# Basic CRUD app with registration and login authentication and authorization
## Users
1. admin: Able to edit, add, delete products.
2. user

## Requirements
1. nodejs, react
2. MySQL

Tables in DB get created automatically.

Entries for first time use:

- type: admin username: admin password: test

### To disable tables getting freshly created on each server run, comment the following snippet in server/server.js:

  ```
  sequelize.sync({ /* force: true */ }).then(() => {
  console.log("Drop and resync DB");
  // init();
  });
  ```
