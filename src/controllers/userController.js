import bcrypt from 'bcrypt';
import { createUserService, isUserExist, getUserByIdService } from "../models/userModel.js";

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
    responseHandler(response, 200, "User Succesfully Created!", newUser);
  } catch(error) {
    next(error);
  }
}

export const compareCredentials = async (request, response, next) => {
  const {username, password} = request.body;
  
  try{
    const user = await isUserExist(usename, password);
    if(!user)
      return responseHandler(response, 404, "User not found.");

    const isValid = await bcrypt.compare(user, password);
    if(!isValid)
      return responseHandler(response, 404, "Invaild Password.");

    responseHandler(res, 200, "User is found/valid.");
  } catch(error) {
    next(error);
  }
}

export const getUserById = async (request, response, next) => {
  try {
    const user = await getUserByIdService(request.params.id);
    if(!user)
      return responseHandler(res, 404, "User not found.")
    responseHandler(res, 200, "User Succesfully fetched!", newUser);
  } catch(error) {
    next(error);
  }
}