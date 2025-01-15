import pb from '@/services/pocketbase.ts';
import type { User } from "@/interfaces/user/User.ts";

export const authService = {
  // Login
  async login(username: string, password: string) {
    try {
      const authData = await pb.collection('users').authWithPassword(username, password);
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
  getCurrentUser(): User | null {
    // todo: fix this
    return pb.authStore.record as unknown as User;
  }
};
