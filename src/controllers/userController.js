import bcrypt from 'bcrypt';
import 'dotenv/config'
import { createUserService, isUserExist, getUserByIdService } from "../models/userModel.js";
import { generateAccessToken } from '../services/tokenAuth.js';

const responseHandler = (response, status, message, data = null) => {
  response.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (request, response, next) => {
  console.log('Signup request:', request.body);
  const { username, firstName, lastName, email, password } = request.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await createUserService(username, firstName, lastName, email, hashPassword);

    //Will disscus this later

    // const token = await generateAccessToken(newUser);
    // console.log("Access token: ", token);

    // response.cookie("access_token", token, {
    //   httpOnly: true,
    //   secure: true,      // HTTPS only
    //   sameSite: "none", 
    // });

    responseHandler(response, 200, "User Succesfully Created!", { user: newUser });
  } catch(error) {
    next(error);
  }
}

export const compareCredentials = async (request, response, next) => {
  const {username, password} = request.body;

  console.log("=== BACKEND LOGIN DEBUG ===");
  console.log("Received username:", username);
  console.log("Received password:", password);
  
  try{
    const user = await isUserExist(username);
    if(!user)
      return responseHandler(response, 404, "User not found.");

    const isValid = await bcrypt.compare(password, user.hash_password);
    if(!isValid)
      return responseHandler(response, 404, "Invaild Password.");

    console.log("User is valid:", user);

    const token = await generateAccessToken(user);
    // console.log("Access token: ", token);
    response.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    responseHandler(response, 200, "User is found/valid.", { user: user });
  } catch(error) {
    next(error);
  }
}

export const getUserById = async (request, response, next) => {
  try {
    const user = await getUserByIdService(request.params.id);
    if(!user)
      return responseHandler(response, 404, "User not found.")
    responseHandler(response, 200, "User Succesfully fetched!", newUser);
  } catch(error) {
    next(error);
  }
}