import User from '../models/User.js';
import CharacterService from './characterService.js';
import ProfileService from './profileService.js';

class UserService {
  static async registerUser(email, password, username, userData) {
    try {
      const authId = await User.createAuthUser(email, password);
      const user = await User.createDbUser({ auth_id: authId, username, email });

      const [profile, character] = await Promise.all([
        await ProfileService.createUserProfile(authId, userData),
        await CharacterService.createUserCharacter(authId, userData),
      ]);

      return { authId, user, profile, character };
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      const data = await User.authLogin(email, password);
      return data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

  static async getUserByAuthId(authId) {
    try {
      const user = await User.getUserByAuthId(authId);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async updateUserByAuthId(authId, updateData) {
    try {
      const user = await User.updateUserByAuthId(authId, updateData);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

export default UserService;
