import PocketBase from 'pocketbase';

export class CrudService<T> {
  private pb: PocketBase;
  private collectionName: string;

  constructor(pb: PocketBase, collectionName: string) {
    this.pb = pb
    this.collectionName = collectionName;
  }
  async getAll(expand?: string): Promise<T[]> {
    return (await this.pb.collection(this.collectionName).getFullList<T>({ expand: expand }));
  }

  async getById(id: string, expand?: string): Promise<T> {
    return this.pb.collection(this.collectionName).getOne<T>(id, { expand: expand });
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
  async exists(id: string): Promise<boolean> {
    try {
      await this.pb.collection(this.collectionName).getOne(id);
      return true; // If no error, the product exists
    } catch (error: any) {
      if (error.status === 404) {
        // If the error is 404, the product does not exist
        return false;
      }
      // Re-throw for other errors
      throw error;
    }
  }
  getPocketbase(): PocketBase {
    return this.pb;
  }
  getCollectionName(): string {
    return this.collectionName;
  }
}
