'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin/item/list', children: 'Все Предметы', slug: 'item' },
  { href: '/admin/recipe/list', children: 'Все рецепты', slug: 'recipe' },
  { href: '/outpost', children: 'Аванпост', slug: 'outpost' },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row max-w-screen-lg w-full justify-center gap-3 px-10 bg-neutral-900 rounded-lg">
      {tabs.map((tabProps, index) => (
        <Link
          {...tabProps}
          key={index}
          className={`text-neutral-200 py-6 px-5 hover:bg-menu-hover bg-center relative after:absolute after:w-full after:h-0.5 after:bg-satisfactory after:-bottom-0.5 after:left-0 hover:after:visible ${
            pathname.includes(tabProps.slug) ? 'text-satisfactory after:visible bg-menu-hover' : 'after:invisible'
          }`}
        />
      ))}
    </div>
  );
};
