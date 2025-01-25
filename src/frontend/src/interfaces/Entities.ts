export type BaseEntity = {
  id: string;
  created: Date;
  updated: Date;
  collectionId: string;
};

export type NamedEntity = BaseEntity & {
  name: string;
}
