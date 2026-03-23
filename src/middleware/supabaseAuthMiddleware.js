import supabase from '../config/db.js';
import Character from '../models/Character.js';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';

export const supabaseAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.log("Failed to get supabase auth user:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const authId = data.user.id;
  const user = await User.getUserByAuthId(authId);
  req.user = user;

  if (await UserProfile.getUserProfileByUserId(authId)) {
    req.profile = await UserProfile.getUserProfileByUserId(authId);
  }

  if (await Character.getCharacterByUserId(authId)) {
    req.character = await Character.getCharacterByUserId(authId);
  }
  return next();
}