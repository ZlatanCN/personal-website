import { memo } from 'react';
import { Toc } from 'pliny/mdx-plugins';
import Link from 'next/link';

type TableOfContentsProps = {
  toc: Toc;
};

const TableOfContents = memo(({ toc }: TableOfContentsProps) => {
  return (
    <div className={'hidden xl:sticky xl:top-31 xl:mt-7 xl:flex'}>
      <div
        className={
          'space-y-4 rounded-lg bg-gray-100/50 p-4 dark:bg-gray-800/50'
        }
      >
        <h2 className={'text-lg font-bold text-gray-900 dark:text-gray-100'}>
          Table of Contents
        </h2>
        <ul className={'space-y-4'}>
          {toc.map((item) => (
            <li key={item.value}>
              <Link
                href={item.url}
                className={`hover:text-primary-500 block text-xs transition-colors ${item.depth === 2 ? 'pl-4' : ''}`}
              >
                {item.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

TableOfContents.displayName = 'TableOfContents';

export { TableOfContents };
