import { Item } from "./Item";

export type Recipe = {
  id: number;
  produced: Item;
  producingPerMinute: number;
  consumption: ItemAndCount[];
}

export type ItemAndCount = {
  item: Item;
  count: number;
}
