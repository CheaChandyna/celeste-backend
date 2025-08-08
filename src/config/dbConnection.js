import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.on('connect', () => {
  console.log('# Connected to the database...');
});

db.on('error', (err) => {
  console.error('Database connection error:', err);
});

export default db;