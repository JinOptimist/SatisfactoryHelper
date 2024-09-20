'use client';

import { Item } from '@/models';
import { useItems } from '@/services/UseItems';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ListWrapper, ListItem, Button, Spinner, InputField } from 'smileComponents';

export default function List() {
  const [search, setSearch] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const { getItems, loading } = useItems();

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const getFilteredItems = useCallback(
    () => items.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search, items]
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <InputField placeholder="Поиск" value={search} onChange={(event) => setSearch(event.target.value)} />
      <Link href="/admin/item/create" className="self-end">
        <Button>Создать</Button>
      </Link>
      {!loading ? (
        <div className="grow overflow-y-auto">
          <ListWrapper>
            {getFilteredItems().map((x) => (
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
