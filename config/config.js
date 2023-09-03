const Pool = require("pg").Pool;
const pool = new Pool({
  host: "db",
  database: "postgres",
  user: "postgres",
  password: "6528",
  // host: "localhost",
  // database: "users_db",
  // database: "postgres",
  // port: 4321,
  // для локального серверу
});

module.exports = {
  pool,
};
