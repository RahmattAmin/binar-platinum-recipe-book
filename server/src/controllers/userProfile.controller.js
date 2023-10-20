import userProfile from "../models/models.js";
import { responseError, responseOk } from "../helpers/restResponse.helper.js";

async function getUserProfile(req, res) {
  const userId = req.params.userId;

  try {
    const profileUser = await userProfile.getUserProfileByUserId(userId);
    if (profileUser) {
      return res.status(200).json(responseOk("Success Get User Profile", profileUser));
    }
  } catch (e) {
    console.error("Error fetching user profile: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
}

const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { fullName, dateOfBirth, address } = req.body;

  try {
    await userProfile.updateUserProfile(userId, fullName, dateOfBirth, address);
    return res.status(200).json(responseOk("User Profile Updated Successfuly"));
  } catch (e) {
    console.error("Error updating user profile: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
};

const deleteUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    await userProfile.deleteUserProfile(userId);
    return res.status(200).json(responseOk("User Profile Deleted Successfuly"));
  } catch (e) {
    console.error("Error deleting user profile: ", e);
    return res.status(e.code || 500).json(responseError(e.message));
  }
};
export default { getUserProfile, updateUserProfile, deleteUserProfile };
