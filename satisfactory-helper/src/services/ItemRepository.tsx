import { Item } from '@/models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useItems() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  function addItem(name: string) {
    const item = { name } as Item;
    const body = JSON.stringify({ item });
    fetch('/api/items', { method: 'POST', body: body })
      .then((response) => response.json())
      .then(() => {
        router.push('/admin/item/list');
      });
  }

  const getItems = async () => {
    const response = await fetch('/api/items', { method: 'GET' });
    const items = (await response.json()) as Item[];
    setItems(items);
    return [...items];
  };

  const getItemsFromCache = async () => {
    if (!items.length) {
      return getItems();
    }
    return [...items];
  };

  return {
    addItem,
    getItems,
    getItemsFromCache,
  };
}
