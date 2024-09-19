'use client';

import { InputField, Button } from 'smileComponents';
import { useItems } from '@/services/UseItems';
import { ChangeEvent, useCallback, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CreateRecipe() {
  const [name, setName] = useState('');

  const { addItem } = useItems();

  const onNameChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  }, []);

  const create = useCallback(() => {
    addItem(name);
  }, [name]);

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
      <div className="self-center">
        <Button onClick={create} disabled={!name.trim()} className="bg-amber-500">
          Create
        </Button>
      </div>
    </div>
  );
}
