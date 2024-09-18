'use client';

import { Attributes, PropsWithChildren } from 'react';

type ListItemProps = {} & PropsWithChildren & Attributes;

export const ListItem = ({ children }: ListItemProps) => {
  return <div className="rounded-md py-2 px-4 bg-neutral-400 hover:bg-neutral-500 flex flex-row">{children}</div>;
};

type ListWrapperProps = {} & PropsWithChildren;

export const ListWrapper = ({ children }: ListWrapperProps) => {
  return <div className="w-full justify-center flex flex-col gap-1">{children}</div>;
};
