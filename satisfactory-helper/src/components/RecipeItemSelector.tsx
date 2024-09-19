'use client';

import { useCallback, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Item } from '@/models';
import { useItems } from '@/services/UseItems';
import { InputField } from './Input';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

type RecipeItemSelectorProps = {
  item?: Item;
  count?: number;
  readonly?: boolean;
  onChange?: (data: { item: Item; count: number }) => void;
};

export const RecipeItemSelector = ({ onChange, readonly, ...props }: RecipeItemSelectorProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [count, setCount] = useState<number>(0);
  const { getItemsFromCache } = useItems();

  useEffect(() => {
    getItemsFromCache().then(setItems);
  }, []);

  useEffect(() => {
    if (props.item) {
      setSelectedItem(props.item);
    }
  }, [props.item]);

  useEffect(() => {
    if (props.count) {
      setCount(props.count);
    }
  }, [props.count]);

  useEffect(() => {
    if (selectedItem && onChange) {
      onChange({
        count,
        item: selectedItem,
      });
    }
  }, [onChange, selectedItem, count]);

  const getItems = useCallback(
    () => items.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search, items]
  );

  return (
    <div className="flex flex-row gap-2 items-start">
      <div>
        <Menu>
          <MenuButton
            className={`text-left w-60 mb-2 py-2 px-4 bg-satisfactory rounded ${
              !selectedItem ? 'text-neutral-500' : ''
            } ${readonly ? '' : 'hover:bg-amber-500'}`}
            disabled={readonly}
          >
            {({ active }) => (
              <div className="flex items-center justify-between">
                {selectedItem ? selectedItem.name : 'Select item'}
                {!readonly && (active ? <ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />)}
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
        disabled={readonly}
      />
    </div>
  );
};
