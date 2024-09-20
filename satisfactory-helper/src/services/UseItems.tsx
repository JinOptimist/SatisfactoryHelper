'use client';

import { Item } from '@/models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from './client';

export const useGetItems = () =>
  useQuery<Item[]>({
    retry: 1,
    queryKey: ['items'],
    queryFn: () =>
      fetch('/api/items', { method: 'GET' })
        .then((res) => res.json())
        .catch(() => []),
  });

export const useAddItem = () =>
  useMutation({
    mutationFn: async (name: string) => {
      const item = { name } as Item;
      const body = JSON.stringify({ item });
      const id = await fetch('/api/items', { method: 'POST', body: body }).then((res) => res.json());
      return { id, name };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
