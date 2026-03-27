import supabase from '../config/db.js';
import { getCharacterByUserId } from '../services/characterService.js';
import { getUserProfileByUserId } from '../services/profileService.js';
import { getUserByAuthId } from '../services/userService.js';

export const supabaseAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized: Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      console.error("Supabase Auth Error:", error?.message);
      return res.status(401).json({ success: false, message: "Unauthorized: Token invalid or expired" });
    }

    const authId = data.user.id;

    const user = await getUserByAuthId(authId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found in database"
      });
    }

    req.user = user;

    const [profile, character] = await Promise.all([
      getUserProfileByUserId(authId),
      getCharacterByUserId(authId)
    ])

    if (profile) {
      req.profile = profile;
    }

    if (character) {
      req.character = character;
    }

    return next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in Authentication"
    })
  }
}