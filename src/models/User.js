import supabase from '../config/db.js';

class User {
  static async createDbUser(user) {
    const { data, error } = await supabase.from('users').insert(user);
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  }

  static async createAuthUser(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      throw new Error(error.message);
    } else {
      return data.user.id;
    }
  }

  static async authLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  }

  static async getUserByAuthId(authId) {
    if (!authId) {
      throw new Error('Auth ID is required to fetch user');
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', authId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user by auth ID', error);
      throw error;
    }
  }

  static async updateUserByAuthId(authId, updateData) {
    if (!authId || !updateData) {
      throw new Error('Missing authId or updateData for updating user');
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('auth_id', authId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

export default User;