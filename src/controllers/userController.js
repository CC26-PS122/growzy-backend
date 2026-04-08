import { supabaseAuthMiddleware } from '../middleware/supabaseAuthMiddleware.js';
import { loginUser, logoutUser, registerUser, updateUserByAuthId } from '../services/userService.js';

export const authMiddleware = async (req, res, next) => {
  supabaseAuthMiddleware(req, res, next);
};

export const signup = async (req, res) => {
  try {
    const { email, password, username, user_data } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and username are required'
      });
    }

    const result = await registerUser(email, password, username, user_data);
    res.status(201).json({
      success: true,
      message: 'Successfully signed user up!',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sign user up!",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Successfully log you in!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logged you in!",
      error: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutUser(req.headers.authorization.split(" ")[1]);
    res.status(200).json({
      success: true,
      message: "Successfully log you out!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logged you out!",
      error: error.message
    });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User data fetched successfully!",
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
      error: error.message
    });
  }
};

export const putUser = async (req, res) => {
  try {
    const { username } = req.body;
    const authId = req.user.auth_id;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    const updatedUser = await updateUserByAuthId(authId, { username });

    res.status(200).json({
      success: true,
      message: "Successfully updating your data",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user data",
      error: error.message
    });
  }
};

