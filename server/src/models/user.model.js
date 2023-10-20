import knex from "../config/db.js";
import ErrorServer from "../helpers/errorHandlers.js";
import bcrypt from "bcrypt";

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    return await knex("users").returning("id").insert({
      username,
      password: hashedPassword,
    });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

async function getUserByUsername(username) {
  try {
    return await knex("users").where("username", username).first();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

const getAllUser = async () => {
  try {
    return await knex.select("*").from("users");
  } catch (e) {
    throw new ErrorServer();
  }
};

async function updateUserPassword(userId, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await knex("users").where("id", userId).update({ password: hashedPassword });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

async function deleteUser(id) {
  try {
    return await knex("users").where("id", id).del();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

export default { createUser, getUserByUsername, getAllUser, updateUserPassword, deleteUser };
