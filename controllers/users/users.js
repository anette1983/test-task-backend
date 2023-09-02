const HttpError = require("../../helpers/HttpError");

const Pool = require("pg").Pool;
const pool = new Pool({
  // host: "localhost",
  host: "db",
  // database: "users_db",
  database: "postgres",
  user: "postgres",
  password: "6528",
  // port: 4321,
});

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   // pool.end();
// });

const getUsers = async (request, response) => {
  try {
    const { role } = request.query; // Отримати параметр "role" з запиту

    console.log("role :>> ", typeof role);

    let query = "SELECT * FROM users";
    //   let query = `
    //   SELECT users.*, profiles.*
    //   FROM users
    //   JOIN profiles ON users.profileid = profiles.id
    // `;
    const values = [];

    if (role) {
      query += " WHERE role = $1";
      // query += " WHERE users.role = $1";
      values.push(role.toUpperCase());
    }

    query += " ORDER BY id ASC";
    //  query += " ORDER BY users.id ASC";

    const results = await pool.query(query, values);
    response.status(200).json(results.rows);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error getting data:", error);
    response
      .status(500)
      .json({ error: "An error occurred while fetching data." });
  }
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (results.rowCount === 0) {
      throw HttpError(404, `User with id = ${id} not found`);
    }
    response.status(200).json(results.rows);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error getting data:", error);
    response.status(error.status).json({ error: error.message });
  }
};

const createUser = async (request, response) => {
  const { username, firstName, lastName, email, role, state } = request.body;
  await pool.connect();
  try {
    await pool.query("BEGIN");
    // profile transaction
    const profileQuery =
      "INSERT INTO profiles (firstName, lastName, state) VALUES ($1, $2, $3) RETURNING id";
    const profileValues = [firstName, lastName, state];
    const profileResult = await pool.query(profileQuery, profileValues);

    // user transaction
    const userQuery =
      "INSERT INTO users (username, email, role, profileid) VALUES ($1, $2, $3, $4) RETURNING id";
    const userValues = [username, email, role, profileResult.rows[0].id];
    const userResult = await pool.query(userQuery, userValues);

    await pool.query("COMMIT");

    response.status(201).json({
      user: userResult.rows,
      profile: profileResult.rows,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error creating records:", error);
    response.status(500).json({ error: error.message });
  }
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const { username, firstName, lastName, email, role, state } = request.body;
  await pool.connect();
  try {
    await pool.query("BEGIN");
    // profile transaction
    const profileQuery =
      "UPDATE profiles SET firstName = $1, lastName = $2, state = $3 WHERE id = $4";
    const profileValues = [firstName, lastName, state, id];
    await pool.query(profileQuery, profileValues);

    // user transaction
    const userQuery =
      "UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4";
    const userValues = [username, email, role, id];
    const results = await pool.query(userQuery, userValues);
    console.log("results :>> ", results);
    if (results.rowCount === 0) {
      throw HttpError(404, `User with id = ${id} not found`);
    }

    await pool.query("COMMIT");

    response.status(200).send(`User and Profile modified with ID: ${id}`);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating records:", error);
    response.json({ error: error.message });
  }
};

const deleteUser = async (request, response) => {
  const id = parseInt(request.params.id);
  await pool.connect();
  try {
    await pool.query("BEGIN");

    // user transaction
    const userQuery = "DELETE FROM users WHERE id = $1";
    const userValues = [id];
    const results = await pool.query(userQuery, userValues);
    if (results.rowCount === 0) {
      throw HttpError(404, `User with id = ${id} not found`);
    }

    // profile transaction
    const profileQuery = "DELETE FROM profiles WHERE id = $1";
    const profileValues = [id];
    await pool.query(profileQuery, profileValues);
    await pool.query("COMMIT");

    response.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating records:", error);
    response.json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  pool,
};
