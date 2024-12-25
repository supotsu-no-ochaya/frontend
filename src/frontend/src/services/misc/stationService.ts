import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {Station} from "@/interfaces/misc/Station.ts";

export class StationService extends CrudService<Station> {
  constructor(pb: PocketBase) {
    super(pb, 'station');
  }
}

export const stationService = new StationService(pb);
