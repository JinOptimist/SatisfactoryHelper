import { Item, ItemAndCount, Recept } from "@/models";

const ironRod = {
  name: "Железный прут",
} as Item;

const ironIngot = {
  name: "Железный слиток",
} as Item;

const screw = {
	name: "Винты",
  } as Item;
  
const ironRodRecept = {
  produced: ironRod,
  producingPerMinute: 15,
  consumption: [{ item: ironIngot, count: 15 } as ItemAndCount],
} as Recept;


const screwRecept = {
  produced: screw,
  producingPerMinute: 40,
  consumption: [{ item: ironRod, count: 10 } as ItemAndCount],
} as Recept;

function getAllReceipts() {
  return [ironRodRecept, screwRecept];
}

const receptRepository = { getAllReceipts };

export default receptRepository;
