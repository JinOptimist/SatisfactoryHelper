'use client';

import { Item } from '@/models';
import { useItems } from '@/services/UseItems';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ListWrapper, ListItem, Button, Spinner } from 'smileComponents';

export default function List() {
  const [items, setItems] = useState<Item[]>([]);
  const { getItems, loading } = useItems();

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full">
      <Link href="/admin/item/create" className="self-end">
        <Button>Создать</Button>
      </Link>
      {!loading ? (
        <div className="grow overflow-y-auto">
          <ListWrapper>
            {items.map((x) => (
              <ListItem key={x.id}>
                {x.name} ({x.id})
              </ListItem>
            ))}
          </ListWrapper>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
