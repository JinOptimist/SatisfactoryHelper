import { Item } from '@/models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useItems() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addItem = async (name: string) => {
    try {
      setLoading(true);
      const item = { name } as Item;
      const body = JSON.stringify({ item });
      await fetch('/api/items', { method: 'POST', body: body });
      router.push('/admin/item/list');
    } finally {
      setLoading(false);
    }
  };

  const getItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items', { method: 'GET' });
      const items = (await response.json()) as Item[];
      setItems(items);
      return [...items];
    } catch (e) {
      return [];
    } finally {
      setLoading(false);
    }
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
    loading,
  };
}
