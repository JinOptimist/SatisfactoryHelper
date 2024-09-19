'use client';

import { Item } from '@/models';
import { useItems } from '@/services/UseItems';
import { useEffect, useState } from 'react';
import { ListWrapper, ListItem } from 'smileComponents';

export default function List() {
  const [items, setItems] = useState<Item[]>([]);
  const { getItems } = useItems();

  useEffect(() => {
	getItems().then(setItems);
  }, []);

  return (
    <ListWrapper>
      {items.map((x) => (
        <ListItem key={x.id}>
          {x.name} ({x.id})
        </ListItem>
      ))}
    </ListWrapper>
  );
}
