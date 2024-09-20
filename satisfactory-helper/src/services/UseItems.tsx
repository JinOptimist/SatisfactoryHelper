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
    mutationFn: (name: string) => {
      const item = { name } as Item;
      const body = JSON.stringify({ item });
      return fetch('/api/items', { method: 'POST', body: body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
