import UserProfile from '../models/UserProfile.js';

class ProfileService {
  static async createUserProfile(userId, userData) {
    try {
      const profile = await UserProfile.createUserProfile(userId, userData);
      return profile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  static async getUserProfileByUserId(userId) {
    try {
      const profile = await UserProfile.getUserProfileByUserId(userId);
      return profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  static async updateUserProfileByUserId(userId, userData) {
    try {
      const updatedProfile = await UserProfile.updateUserProfileByUserId(userId, userData);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

export default ProfileService;
