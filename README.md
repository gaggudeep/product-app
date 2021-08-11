# Basic CRUD app with registration and login authentication and authorization

##Instructions to run on machine:
1. Clone or download repo
2. Install npm, NodeJs and MySQL
3. In project dir, run cmd: `npm install`
4. Run cmd: `npm start`
5. Go into server folder, run cmd: `npm install`
6. Run cmd: `node server.js`

## Users
1. admin: Able to edit, add, delete products.
2. user

## Requirements
1. nodejs, react
2. MySQL
3. GIT

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
