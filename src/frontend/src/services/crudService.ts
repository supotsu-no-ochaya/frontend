import Pocketbase from "@/services/pocketbase";


export class CrudService<T> {
  private pb: Pocketbase;
  constructor(pb: Pocketbase, collectionName: string) {
    this.pb = pb
    this.collectionName = collectionName;
  }
  async getAll(): Promise<T[]> {
    return this.pb.collection(this.collectionName).getFullList<T>();
  }
  async getById(id: string): Promise<T> {
    return this.pb.collection(this.collectionName).getOne<T>(id);
  }
  async create(data: Partial<T>): Promise<T> {
    return this.pb.collection(this.collectionName).create(data);
  }
  async update(id: string, data: Partial<T>): Promise<T> {
    return this.pb.collection(this.collectionName).update(id, data);
  }
  async delete(id: string): Promise<boolean> {
    return this.pb.collection(this.collectionName).delete(id);
  }
};
