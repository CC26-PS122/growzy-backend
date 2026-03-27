import { updateUserProfileByUserId } from '../services/profileService.js';

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully!",
      data: req.profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message
    });
  }
};

export const putUserProfile = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID not found in token'
      });
    }

    const result = await updateUserProfileByUserId(userId, userData);
    res.status(200).json({
      success: true,
      message: 'Successfully updating your profile',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process profile',
      error: error.message
    });
  }
};
