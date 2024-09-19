'use client';

import { useCallback, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Item } from '@/models';
import { useItems } from '@/services/ItemRepository';
import { InputField } from './Input';
import { Button } from './Button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

type RecipeItemSelectorProps = {
  onChange: (data: { item: Item; count: number }) => void;
};

export const RecipeItemSelector = ({ onChange }: RecipeItemSelectorProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [count, setCount] = useState<number>(0);
  const { getItemsFromCache } = useItems();

  useEffect(() => {
    getItemsFromCache().then(setItems);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      onChange({
        count,
        item: selectedItem,
      });
    }
  }, [selectedItem, count]);

  const getItems = useCallback(
    () => items.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search, items]
  );

  return (
    <div className="flex flex-row gap-2 items-start">
      <div>
        <Menu>
          <MenuButton as={Button} className={`text-left w-60 mb-2 ${!selectedItem ? 'text-neutral-500' : ''}`}>
            {({ active }) => (
              <div className="flex items-center justify-between">
                {selectedItem ? selectedItem.name : 'Items'}{' '}
                {active ? <ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />}
              </div>
            )}
          </MenuButton>
          <MenuItems className="py-2 px-2 bg-neutral-200 rounded flex flex-col gap-2 max-w-60">
            <InputField value={search} onChange={(event) => setSearch(event.target.value)} placeholder="item name" />
            <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
              {getItems().map((item) => (
                <MenuItem key={item.id}>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className={`hover:bg-neutral-300 py-2 px-2 rounded text-left border ${
                      selectedItem?.id === item.id ? 'bg-neutral-300' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>

      <InputField
        type="number"
        value={count}
        onChange={(event) => setCount(+event.target.value)}
        placeholder="item name"
        className="max-w-20"
      />
    </div>
  );
};
