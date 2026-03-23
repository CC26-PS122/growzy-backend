import Character from '../models/Character.js';

class CharacterService {
  static async createUserCharacter(userId, userData) {
    try {
      const character = await Character.createUserCharacter(userId, userData);
      return character;
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
  }

  static async getCharacterByUserId(userId) {
    try {
      const character = await Character.getCharacterByUserId(userId);
      return character;
    } catch (error) {
      console.error('Error fetching character:', error);
      throw error;
    }
  }
}

export default CharacterService;
