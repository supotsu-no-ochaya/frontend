import {CrudService} from "@/services/crudService.ts";
import PocketBase from "pocketbase";
import pb from "@/services/pocketbase.ts"
import type {UserRole} from "@/interfaces/user/UserRole.ts";

export class UserRoleService extends CrudService<UserRole> {
  constructor(pb: PocketBase) {
    super(pb, 'user_role');
  }
}

export default new UserRoleService(pb);
