import User from '../../models/User.js';
import {
  supabaseAuthMiddleware
} from './supabaseAuthMiddleware.js';

export const authMiddleware = async (req, res, next) => {
  supabaseAuthMiddleware(req, res, next)
}

export const signup = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const authId = await User.createAuthUser(email, password)
    await User.createDbUser({ auth_id: authId, username, email, })
    res.status(201).json({ message: 'Successfully signed user up!', });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const data = await User.authLogin(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  res.status(200).send(req.user)
};

export const putUser = async (req, res) => {
  const { username } = req.body;
  const authId = req.user.auth_id;
  try {
    await User.updateUserByAuthId(authId, { username });
    res.status(200).json({ message: "Successfully updating user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
