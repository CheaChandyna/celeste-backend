// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import 'dotenv/config'
import { createUserService, isUserExist, getUserByIdService, updateUserService } from "../models/userModel.js";
import { generateAccessToken, generateReFreshToken } from '../services/tokenAuth.js';


const responseHandler = (response, status, message, data = null) => {
  response.status(status).json({
    status,
    message,
    data,
  });
};


// Signup
export const registerController = async (request, response, next) => {
  console.log('Signup request:', request.body);
  const { username, firstName, lastName, email, password } = request.body;

  // Check if the password was actually received from the request body.
  if (!password) {
    // If not, send a clear error message back.
    return responseHandler(response, 400, "Bad Request: Password is required.");
  }
  
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await createUserService(username, firstName, lastName, email, hashPassword);

    responseHandler(response, 200, "User Succesfully Created!", { user: newUser });
  } catch(error) {
    next(error);
  }
}

// Login
export const loginController = async (request, response, next) => {
  const {username, password} = request.body;
  
  try{
    const user = await isUserExist(username);
    if(!user)
      return responseHandler(response, 404, "User not found.");

    const isValid = await bcrypt.compare(password, user.hash_password);
    if(!isValid)
      return responseHandler(response, 404, "Invaild Password.");

    console.log("User is valid:", user);

    const token = await generateAccessToken(user);
    response.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    
    const refreshToken = await generateReFreshToken(user);
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });


    responseHandler(response, 200, "User is found/valid.", { user: user });
  } catch(error) {
    next(error);
  }
}

// Logout
export const logoutController = (request, response, next) => {
  try {
    response.clearCookie("access_token", { 
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    response.clearCookie("refresh_token", { 
      httpOnly: true, 
      secure: true,
      sameSite: "none",
    });

    responseHandler(response, 200, "Logged out successfully.");
  } catch (error) {
    console.log("Error in logout controller", error.message);

    responseHandler(response, 500, "Internal Server Error.");
    next(error);
  }
}

// Token refresh
export const tokenController = async (request, response, next) => {
  const { refresh_token } = request.cookies;

  try {
    if (!refresh_token)
      return responseHandler(response, 401, "No refresh token provided/Invalid.");

    // verify the refresh token
    await jwt.verify(refresh_token, process.env.REFRESH_KEY, async (err, user) => {
      if (err) 
        return responseHandler(response, 403, "Token invalid or expired.");

      // and give em a new access token
      const newToken = await generateAccessToken(request.user);
      response.cookie("access_token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      responseHandler(response, 200, "New access token generated.");
    });
  } catch (error) {
    next(error);
  }
};

// Get user information by ID for admin or other purposes (mostly dashboard)
export const getUserInfoController = async (request, response, next) => {
  try {
    const user = await getUserByIdService(request.user.id);
    if(!user)
      return responseHandler(response, 404, "User not found.")

    responseHandler(response, 200, "User Succesfully fetched!", user); //im not sure about newUser here
  } catch(error) {                                                     //im putting user (before: newUser, after: user)
    next(error);
  }
}

export const updateUserController = async (request, response, next) => {
  const id = request.user.id;
  const { first_name, last_name, gender, email, phone, nationality, bio, avatar_URL } = request.body;

  try {
    const user = await getUserByIdService(id);

    if (!user) {
      return responseHandler(response, 404, "User not found.");
    }
    
    let updateData = { first_name, last_name, gender, email, phone, nationality, bio, avatar_URL };
    // filter out empty values
    updateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );
    
    const updatedUser = await updateUserService(id, updateData);

    responseHandler(response, 200, "User successfully updated!", updatedUser);
  } catch (error) {
    next(error);
  }
}