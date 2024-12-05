import pb from '@/services/pocketbase';
import type { MenuItem } from '@/interfaces/MenuItem.ts';

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    return pb.collection('menu_item').getFullList<MenuItem>();
  },
  async getById(id: string): Promise<MenuItem> {
    return pb.collection('menu_item').getOne<MenuItem>(id);
  },
  async create(data: Partial<MenuItem>): Promise<MenuItem> {
    return pb.collection('menu_item').create(data);
  },
  async update(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    return pb.collection('menu_item').update(id, data);
  },
  async delete(id: string): Promise<boolean> {
    return pb.collection('menu_item').delete(id);
  },
};
