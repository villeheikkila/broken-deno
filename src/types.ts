import { categories } from "./constants/config.ts";
import { colors } from "./constants/theme.ts";

export type Colors = keyof typeof colors;
export type Categories = typeof categories[number];
export type Stock = "INSTOCK" | "LESSTHAN10" | "OUTOFSTOCK";

export interface Availability {
  id: string;
  DATAPAYLOAD: string;
}

export interface AvailabilityResponse {
  code: number;
  response: Availability[];
}

export interface Item {
  id: string;
  type: string;
  name: string;
  color: Colors[];
  price: number;
  manufacturer: string;
}

export interface ItemAvailability extends Item {
  index: number;
  stock: Stock;
}

export type CacheData = Record<Categories, ItemAvailability[]>;
