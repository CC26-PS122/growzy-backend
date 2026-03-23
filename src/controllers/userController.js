import UserService from '../services/userService.js';
import { supabaseAuthMiddleware } from '../middleware/supabaseAuthMiddleware.js';

export const authMiddleware = async (req, res, next) => {
  supabaseAuthMiddleware(req, res, next);
};

export const signup = async (req, res) => {
  try {
    const { email, password, username, user_data } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required' });
    }

    await UserService.registerUser(email, password, username, user_data);

    res.status(201).json({ message: 'Successfully signed user up!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const data = await UserService.loginUser(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putUser = async (req, res) => {
  try {
    const { username } = req.body;
    const authId = req.user.auth_id;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    await UserService.updateUserByAuthId(authId, { username });
    res.status(200).json({ message: 'Successfully updating user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

