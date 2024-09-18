'use client';

import { InputField, Button } from 'smileComponents';
import { useItems } from '@/services/ItemRepository';
import { ChangeEvent, useCallback, useState } from 'react';

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
    <div>
      Создаём Предмет
      <div className="flex flex-row gap-4">
        <InputField value={name} onChange={onNameChange} placeholder="Название предмета" className="grow" />
        <Button onClick={create}>Create</Button>
      </div>
    </div>
  );
}
