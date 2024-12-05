import pb from '@/services/pocketbase';
import type { User } from '@/interfaces/User.ts';

export const userService = {
  async getAll(): Promise<User[]> {
    return pb.collection('users').getFullList<User>({ sort: '-created' });
  },
  async getById(id: string): Promise<User> {
    return pb.collection('users').getOne<User>(id);
  },
  async create(data: Partial<User>): Promise<User> {
    return pb.collection('users').create(data);
  },
  async update(id: string, data: Partial<User>): Promise<User> {
    return pb.collection('users').update(id, data);
  },
  async delete(id: string): Promise<boolean> {
    return pb.collection('users').delete(id);
  },
};
