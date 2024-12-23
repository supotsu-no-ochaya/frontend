import type {BaseEntity} from "@/interfaces/Entities.ts";

export type UserRole = BaseEntity & {
  role_name: string;
};
