import type {BaseEntity} from "@/interfaces/Entities.ts";

export type AdminSettings = BaseEntity & {
  config: SettingsTemplate;
};

export type SettingsTemplate = {
  discountPercentage: number;
}
