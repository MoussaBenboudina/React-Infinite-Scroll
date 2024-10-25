export type Id = string | number;

export interface Item {
  id: Id;
  title: string;
  description: string;
}

export interface Data {
  id: Id;
  title: string;
  price: number | string;
  description: string;
  image: string;
}
