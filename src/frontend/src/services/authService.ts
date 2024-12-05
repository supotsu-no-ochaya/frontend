import pb from '@/services/pocketbase';

export const authService = {
  // Login
  async login(email: string, password: string) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      // Store the auth token for further requests
      pb.authStore.save(authData.token, authData.record);
      return authData;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  // Logout
  async logout() {
    try {
      pb.authStore.clear(); // Clears the authentication token and user data
    } catch (error) {
      throw new Error('Logout failed. Please try again.');
    }
  },

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return pb.authStore.isValid;
  },

  // Get the current user
  getCurrentUser() {
    return pb.authStore.record;
  }
};
