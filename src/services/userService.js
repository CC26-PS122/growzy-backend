import supabase from '../config/db.js';
import { createUserCharacter } from './characterService.js';
import { createUserProfile } from './profileService.js';

export const registerUser = async (email, password, username, userData) => {
  try {
    const authId = await createAuthUser(email, password);
    const user = await createDbUser({ auth_id: authId, username, email });

    const [profile, character] = await Promise.all([
      createUserProfile(authId, userData),
      createUserCharacter(authId, userData),
    ]);

    return { authId, user, profile, character };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

const createDbUser = async (user) => {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const createAuthUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email, password, options: {
      emailRedirectTo: "https://growzy-backend.vercel.app/confirm-email"
    }
  });
  if (error) throw error;
  return data.user.id;
};

export const getUserByAuthId = async (authId) => {
  if (!authId) {
    throw new Error('Auth ID is required to fetch user');
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, auth_id, username, email, created_at')
      .eq('auth_id', authId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user by auth ID', error);
    throw error;
  }
}

export const updateUserByAuthId = async (authId, updateData) => {
  if (!authId || !updateData) {
    throw new Error('Missing authId or updateData for updating user');
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('auth_id', authId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}