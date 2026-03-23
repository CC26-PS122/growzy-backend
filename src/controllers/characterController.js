import CharacterService from '../services/characterService.js';

export const getCharacter = async (req, res) => {
  try {
    res.status(200).send(req.character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const postCharacter = async (req, res) => {
//   try {
//     const userData = req.body;
//     const userId = req.user?.auth_id;

//     if (!userId) {
//       return res.status(401).json({ message: 'User ID not found in token' });
//     }

//     const character = await CharacterService.createUserCharacter(userId, userData);
//     res.status(201).json({ message: 'Successfully creating your character', data: character });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to process character', error: error.message });
//   }
// };
