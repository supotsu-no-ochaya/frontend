import type {BaseEntity} from "@/interfaces/Entities.ts";

export type User = BaseEntity & {
  username: string;
  password: string;
  email?: string;
  emailVisibility?: boolean;
  verified?: boolean;
  name?: string;
  role: string;
};
