import express from 'express';
import cors from 'cors';
import db from './src/config/dbConnection.js';
import errorHandling from './src/middleware/errorHandler.js';
import createUserTable from './src/data/createUserTable.js';
import authRoute from './src/routes/authRouter.js'
import userRoute from './src/routes/userRouter.js'
import 'dotenv/config'

const app = express();
const port = 3000;

//<iddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- START: ADD THIS DEBUGGING BLOCK 
// (just to look what it look like in postman)---
// This middleware will run immediately after express.json()
// and show us what the request body looks like.
app.use((req, res, next) => {
  console.log("--- Request Body Check ---");
  console.log(req.body);
  console.log("--------------------------");
  next(); // This is crucial, it passes the request to the next step
});
// --- END: ADD THIS DEBUGGING BLOCK ---

app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true
 }));

//route for users services
app.use("/auth", authRoute);
app.use("/api", userRoute);

//errror handler middleware
app.use(errorHandling);

createUserTable();

app.get('/', async (request, response) => {
  const result = await db.query('SELECT current_database()');
  response.send(`Database connected successfully: ${result.rows[0].current_database}`);
});

app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}.....`);
});

app.get('/', (request, response) => {
  response.send("Server is up!");
});