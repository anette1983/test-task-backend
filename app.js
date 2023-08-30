const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const initDb = require("./db");

const usersRouter = require("./routes/api/users");
// const { Pool } = require("pg");


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "users_db",
//   password: "6528",
//   port: 5432,
// });

// const db = initDb(); // Вызывайте функцию initDb для получения объекта подключения

// const usersRouter = require("./routes/api/users")(db);

app.use("/api/users", usersRouter);
// app.use("/api/users", usersRouter(pool));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
