"use client";

import { ChangeEvent, useCallback, useState } from "react";

export default function CreateRecipe() {
  const [item, setName] = useState("");

  const onItemChange = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
    setName(evt.target.value);
    console.log(item);
  }, []);
  return (
    <div>
      create Recipe:
      {/* <input value={name} onChange={onNameChange}></input> */}
      <select onChange={onItemChange}>
        <option></option>
      </select>
    </div>
  );
}
