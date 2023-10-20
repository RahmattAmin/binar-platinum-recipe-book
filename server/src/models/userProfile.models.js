import knex from "../config/db.js";
import ErrorServer from "../helpers/errorHandlers.js";

async function getUserProfileByUserId(userId) {
  try {
    return knex("user_profile").where("user_id", userId).first();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

async function createUserProfile(userId, email, fullName, dateOfBirth, address) {
  try {
    return knex("user_profile").insert({
      user_id: userId,
      email: email,
      full_name: fullName,
      date_of_birth: dateOfBirth,
      address: address,
    });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

async function updateUserProfile(userId, email, fullName, dateOfBirth, address) {
  try {
    return knex("user_profile").where("user_id", userId).update({
      full_name: fullName,
      email: email,
      date_of_birth: dateOfBirth,
      address: address,
    });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

async function deleteUserProfile(userId) {
  try {
    return knex("user_profile").where("user_id", userId).del();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

export default { getUserProfileByUserId, createUserProfile, updateUserProfile, deleteUserProfile, userProfile };
