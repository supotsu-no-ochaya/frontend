export interface User {
  id: string;
  email: string;
  password?: string; // Include for creation or updates
  role: string; // e.g., 'admin', 'user'
  created: string;
  updated: string;
}
