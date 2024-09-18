import { Item } from "@/models";
import { useRouter } from "next/navigation";

export function useItems(){
	const router = useRouter();

	function addItem(name: string) {
		const item = { name } as Item;
		const body = JSON.stringify({item});
		fetch("/api/items", { method: "POST", body: body })
		  .then((response) => response.json())
		  .then(() => {
			router.push("/admin/item/list");
		  });
	}
	
	return {
		addItem
	}
}