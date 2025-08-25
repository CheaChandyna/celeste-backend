import db  from '../config/dbConnection.js';

// Temporay tables
const createCartTable = async () =>  {
  const CartTable = `
    CREATE TABLE IF NOT EXISTS carts (
      cart_id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE NOT NULL,
      product_id INTEGER UNIQUE NOT NULL,
      quantity INTEGER DEFAULT 1,
      added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;
  try {
    const result = await db.query(CartTable);
    console.log('# Carts table created successfully or already exsit.');
  } catch (error) {
    console.log('Error creating carts table:', error);
  }
}

const createOrderItemsTable = async () =>  {
  const OrderItemTable = `
    CREATE TABLE IF NOT EXISTS order_items (
      order_item_id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    );`;
  try {
    const result = await db.query(OrderItemTable);
    console.log('# Order Items table created successfully or already exsit.');
  } catch (error) {
    console.log('Error creating order items table:', error);
  }
}

const createOrderTable = async () =>  {
  const OrderTable = `
    CREATE TABLE IF NOT EXISTS orders (
      order_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;
  try {
    const result = await db.query(OrderTable);
    console.log('# Orders table created successfully or already exsit.');
  } catch (error) {
    console.log('Error creating orders table:', error);
  }
}

export default {createCartTable, createOrderTable};