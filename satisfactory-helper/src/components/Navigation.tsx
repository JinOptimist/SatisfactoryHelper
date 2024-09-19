'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { key: 0, href: '/admin/item/list', children: 'Все Предметы' },
  { key: 1, href: '/admin/item/create', children: 'Создать Предмет' },
  { key: 2, href: '/admin/recipe/list', children: 'Все рецепты' },
  { key: 3, href: '/admin/recipe/create', children: 'Создать рецепт' },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row max-w-screen-lg w-full justify-center gap-6 px-10 bg-neutral-900 rounded-lg">
      {tabs.map((tabProps) => (
        <Link
          {...tabProps}
		  key={tabProps.key}
          className={`text-neutral-200 py-6 px-2 hover:bg-menu-hover bg-center relative after:absolute after:w-full after:h-0.5 after:bg-satisfactory after:-bottom-0.5 after:left-0 hover:after:visible ${
            tabProps.href === pathname ? 'text-satisfactory after:visible bg-menu-hover' : 'after:invisible'
          }`}
        />
      ))}
    </div>
  );
};
