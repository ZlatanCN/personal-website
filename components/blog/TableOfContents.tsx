import { memo } from 'react';
import { type Toc } from 'pliny/mdx-plugins';
import Link from 'next/link';

type TableOfContentsProps = {
  toc: Toc;
  activeId: string;
};

const TableOfContents = memo(({ toc, activeId }: TableOfContentsProps) => {
  return (
    <div
      className={
        'hidden overflow-auto xl:sticky xl:top-31 xl:mt-10 xl:flex xl:justify-end'
      }
    >
      <div
        className={'space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/70'}
      >
        <h2 className={'text-lg font-bold text-gray-900 dark:text-gray-100'}>
          Table of Contents
        </h2>
        <ul className={'space-y-4'}>
          {toc.map((item) => (
            <li key={item.value}>
              <Link
                href={item.url}
                style={{
                  paddingLeft: `${item.depth > 1 ? item.depth * 0.5 : 0}rem`,
                }}
                className={`hover:text-primary-500 block text-xs transition-colors ${activeId == item.url.slice(1) ? 'text-primary-500 font-semibold' : ''}`}
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
