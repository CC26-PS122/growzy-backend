import UserProfile from '../../models/UserProfile.js';

export const getUserProfile = async (req, res) => {
  res.status(200).send(req.profile)
}

export const postUserProfile = async (req, res) => {
  console.log(req.body);
}