import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {AdminSettings} from "@/interfaces/misc/AdminSettings.ts";

export class AdminSettingsService extends CrudService<AdminSettings> {
  constructor(pb: PocketBase) {
    super(pb, 'admin_settings');
  }
}

new AdminSettingsService(pb);
