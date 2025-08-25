import db from '../config/dbConnection.js';

const createUserTable = async () =>  {
  const UserTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      hash_password VARCHAR(255) NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      reset_password_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_role VARCHAR(20) DEFAULT 'customer',
      avatar_url VARCHAR(255) DEFAULT NULL,
      bio TEXT DEFAULT NULL,
      last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
  try {
    const result = await db.query(UserTable);
    console.log('# Users table created successfully or already exsit.');
} catch (error) {
    console.log('Error creating users table:', error);
}
}

export default createUserTable;