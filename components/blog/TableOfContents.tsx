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
      className={'hidden xl:sticky xl:top-32 xl:mt-10 xl:flex xl:justify-end'}
    >
      <div
        style={{ maxHeight: 'calc(100vh - 10rem)' }}
        className={
          'scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb w-full space-y-4 overflow-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900/70'
        }
      >
        <ul className={'space-y-4'}>
          {toc.map((item) => (
            <li key={item.value}>
              <Link
                href={item.url}
                style={{
                  paddingLeft: `${item.depth > 1 ? item.depth * 0.5 : 0}rem`,
                }}
                className={`hover:text-primary-500 block text-xs transition-colors duration-200 ${
                  activeId == item.url.slice(1) ? 'text-primary-500' : ''
                }`}
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
