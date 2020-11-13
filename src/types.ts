import { categories } from "./constants/config.ts";

export interface Item {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
}

export interface Availability {
  id: string;
  DATAPAYLOAD: string;
}

export interface AvailabilityResponse {
  code: number;
  response: Availability[];
}

export interface ItemAvailability extends Item {
  index: number;
  stock: "INSTOCK" | "LESSTHAN10" | "OUTOFSTOCK";
}

export type Categories = typeof categories[number];

export type CacheData = Record<Categories, ItemAvailability[]>;
