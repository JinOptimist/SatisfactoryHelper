'use client';

import { InputField, Button } from 'smileComponents';
import { useAddItem, useGetItems } from '@/services/UseItems';
import { ChangeEvent, useCallback, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateRecipe() {
  const router = useRouter();
  const [name, setName] = useState('');

  const { data: items } = useGetItems();
  const addItemMutation = useAddItem();

  const onNameChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  }, []);

  const create = useCallback(() => {
    addItemMutation.mutate(name, {
      onSuccess: () => {
        router.push('/admin/item/list');
      },
    });
  }, [name]);

  const createAndStay = useCallback(async () => {
    setName('');
    addItemMutation.mutate(name);
  }, [name]);

  const getFilteredItems = useCallback(
    () => (items || []).filter((item) => item.name.toLowerCase().includes(name.toLowerCase())),
    [name, items]
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 flex items-center">
        <span className="text-2xl text-amber-500 text-center grow">Создание Предмета</span>
        <Link href="/admin/item/list">
          <XMarkIcon className="size-6" />
        </Link>
      </h2>

      <div className="flex">
        <InputField value={name} onChange={onNameChange} placeholder="Название предмета" className="grow" />
      </div>
      <ul className="flex flex-row flex-wrap gap-4">
        {getFilteredItems().map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
      <div className="self-center flex gap-2">
        <Button onClick={create} disabled={!name.trim()} className="bg-amber-500">
          Создать
        </Button>
        <Button onClick={createAndStay} disabled={!name.trim()} className="bg-amber-500">
          Создать и остаться
        </Button>
      </div>
    </div>
  );
}
