export type BaseEntity = {
  id: string;
  created: Date;
  updated: Date;
};

export type NamedEntity = BaseEntity & {
  name: string;
}
