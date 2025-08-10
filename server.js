import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import bcrypt from 'bcrypt'
import db from './src/config/dbConnection.js';
import errorHandling from './src/middleware/errorHandler.js';
import createUserTable from './src/data/createUserTable.js';
import authRoute from './src/routes/authRouter.js'
import userRoute from './src/routes/userRouter.js'

const app = express();
const port = 3000;

//<iddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

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

// app.post('/signup', async (request, response) => {

// });

// app.post('/signup', async (request, response) => {
//   // Check if the user already exists
//   const existingUser = await users.findOne({ UserName: request.body.UserName });
//   if (!existingUser) {
//     try {
//       const HashedPassword = await bcrypt.hash(request.body.Password, 10)

//        // Create a new user in database
//       const user = await users.create({
//         UserName: request.body.UserName,
//         FirstName: request.body.FirstName,
//         LastName: request.body.LastName,
//         Email: request.body.Email,
//         HashPassword: HashedPassword,
//       });

//       response.status(200).json(request.body)
//     } 
//     catch (error) {
//       console.error("# Error during signup:", error);
//       response.status(500).send("Internal Server Error");
//     }
//   }
//   else
//     response.status(400).send("User already exists");
// });

// app.post('/login', async (request, response) => {

//   const existingUser = compareCredentials(request.body.UserName, request.body.Password);

//   if (existingUser) {
//     response.status(200).json({ message: "Login successful" });
//   }
//   else {
//     response.status(401).send("Invalid credentials");
//   }
// });


app.get('/', (request, response) => {
  response.send("Server is up!");
});


