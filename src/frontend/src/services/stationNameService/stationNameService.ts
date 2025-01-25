import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import { CrudService } from "@/services/crudService.ts";
import type { station } from '@/interfaces/station/stationName';


export class StationNameService extends CrudService<station> {
    constructor(pb: PocketBase) {
      super(pb, "station");
    }
}

export const stationNameService = new StationNameService(pb);
