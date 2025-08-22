import db from '../config/dbConnection.js'

export const createUserService = async(username, firstName, lastName, email, hashPassword) => {
  const result = await db.query(
    "INSERT INTO users (username, first_name, last_name, email, hash_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, firstName, lastName, email, hashPassword]
  );
  return result.rows[0];
};

export const isUserExist = async (username) => {
  const result = await db.query(
    "SELECT id, username, email, hash_password FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

export const getUserByIdService = async (id) => {
  const result = await db.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};