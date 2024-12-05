import type { User } from '@/interfaces/User.ts';
import {CrudService} from "@/services/crudService";
import pb from "@/services/pocketbase"

export class UserService extends CrudService<User> {
  constructor(pb: P) {
    super(pb, 'users');
  }
}

export default userService = new UserService(pb);
