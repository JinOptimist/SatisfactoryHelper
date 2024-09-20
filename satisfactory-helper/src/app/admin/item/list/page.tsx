'use client';

import { Item } from '@/models';
import { useGetItems } from '@/services/UseItems';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ListWrapper, ListItem, Button, Spinner, InputField } from 'smileComponents';

export default function List() {
  const [search, setSearch] = useState<string>('');
  const { data: items, isLoading } = useGetItems();

  const getFilteredItems = useCallback(
    () => (items || []).filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search, items]
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <InputField placeholder="Поиск" value={search} onChange={(event) => setSearch(event.target.value)} />
      <Link href="/admin/item/create" className="self-end">
        <Button>Создать</Button>
      </Link>
      {!isLoading ? (
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
