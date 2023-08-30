const initOptions = {};

const pgp = require("pg-promise")(initOptions);
const connectionConfig = {
  user: "postgres",
  host: "localhost",
  database: "users_db",
  password: "6528",
  port: 5432,
};
const db = pgp(connectionConfig);

module.exports = () => {
  return db;
};
