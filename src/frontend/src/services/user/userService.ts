import type { User } from '@/interfaces/user/User.ts';
import {CrudService} from "@/services/crudService.ts";
import PocketBase from "pocketbase";
import pb from "@/services/pocketbase.ts"

export class UserService extends CrudService<User> {
  constructor(pb: PocketBase) {
    super(pb, 'users');
  }
}

export default new UserService(pb);
