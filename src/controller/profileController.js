import UserProfile from '../../models/UserProfile.js';

export const getUserProfile = async (req, res) => {
  res.status(200).send(req.profile);
}

export const postUserProfile = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.user?.auth_id;
    if (!userId) {
      return res.status(401).json({ message: "User ID tidak ditemukan dalam token" });
    }

    const profile = await UserProfile.createUserProfile(userId, userData);
    res.status(200).json({ message: "Successfully creating your profile", data: profile });
  } catch (error) {
    res.status(500).json({ message: "Gagal memproses profil", error: error.message });
  }
}