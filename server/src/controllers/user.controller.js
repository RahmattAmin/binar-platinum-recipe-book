import { users, userProfile } from "../models/models.js";
import { responseError, responseOk } from "../helpers/restResponse.helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  const { email, password, fullName, dateOfBirth, address } = req.body;
  try {
    const [user_id] = await users.createUser(username, password);
    const userId = user_id.id;
    await userProfile.createUserProfile(userId, fullName, dateOfBirth, address);
    return res.status(201).json(
      responseOk("User Registered Sucessfully", {
        email,
        fullName,
        dateOfBirth,
        address,
      })
    );
  } catch (e) {
    console.error("Error registering user: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
}

async function getUsers(req, res) {
  try {
    const users = await users.getAllUser();
    return res.status(200).json(responseError("Success Fetching Users", users));
  } catch (e) {
    console.error("Error fetching users: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
}

async function updatePassword(req, res) {
  const id = req.params.id;
  const newPassword = req.body.password;
  try {
    await users.updateUserPassword(id, newPassword);
    return res.status(200).json(responseOk("User Password Updated Sucessfully"));
  } catch (e) {
    console.error("Error updating user password: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
}

async function isLogin(req, res) {
  const { username, password } = req.body;
  const JWT_KEY = process.env.JWT_SECRET;
  try {
    const userByUsername = await users.getUserByUsername(username);
    if (userByUsername && (await bcrypt.compare(password, userByUsername.hash_password))) {
      const access_token = jwt.sign({ user: { user_id: userByUsername.id } }, JWT_KEY, {
        expiresIn: "1h",
      });
      return res.status(201).json(responseOk("Login Sucessfully", { access_token: access_token }));
    } else {
      res.status(403).json(responseError("Invalid Credentials"));
    }
  } catch (e) {
    console.error("Error registering user: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
}
async function deleteUserAndProfile(req, res) {
  const id = req.params.id;
  try {
    await users.deleteUser(id);
    await userProfile.deleteUserProfile(id);
    return res.status(200).json(responseOk("User & Profile Deleted Successfuly"));
  } catch (e) {
    console.error("Error Deleting User and Profile: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
}

export default { registerUser, isLogin, getUsers, updatePassword, deleteUserAndProfile };
