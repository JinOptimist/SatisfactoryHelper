"use client";

import { useItems } from "@/services/ItemRepository";
import { ChangeEvent, useCallback, useState } from "react";

export default function CreateRecipe() {
  const [name, setName] = useState("");

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
      <div>
        <input className="border" value={name} onChange={onNameChange} placeholder="Название предмета"></input>
      </div>
      <div>
        <button onClick={create}>Create</button>
      </div>
    </div>
  );
}
