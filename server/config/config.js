module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root@123",
  DB: "nodejs",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  SERVER_PORT: 8080,
  CLIENT_PORT: 3000
};
