import ProfileService from '../services/profileService.js';

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).send(req.profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const postUserProfile = async (req, res) => {
//   try {
//     const userData = req.body;
//     const userId = req.user?.auth_id;

//     if (!userId) {
//       return res.status(401).json({ message: 'User ID not found in token' });
//     }

//     const profile = await ProfileService.createUserProfile(userId, userData);
//     res.status(201).json({ message: 'Successfully creating your profile', data: profile });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to process profile', error: error.message });
//   }
// };

export const putUserProfile = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.user?.auth_id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    await ProfileService.updateUserProfileByUserId(userId, userData);
    res.status(201).json({ message: 'Successfully updating your profile' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process profile', error: error.message });
  }
}
