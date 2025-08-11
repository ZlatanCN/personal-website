import Link from 'next/link'
import type { Toc } from 'pliny/mdx-plugins'
import { memo } from 'react'

type TableOfContentsProps = {
  toc: Toc
  activeId: string
}

const TableOfContents = memo(({ toc, activeId }: TableOfContentsProps) => {
  return (
    <div className={'hidden xl:sticky xl:top-32 xl:mt-10 xl:flex xl:justify-end'}>
      <div
        className={
          'scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb w-full space-y-4 overflow-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900/70'
        }
        style={{ maxHeight: 'calc(100vh - 10rem)' }}
      >
        <ul className={'space-y-4'}>
          {toc.map(item => (
            <li key={item.value}>
              <Link
                className={`block text-xs transition-colors duration-200 hover:text-primary-500 ${
                  activeId == item.url.slice(1) ? 'text-primary-500' : ''
                }`}
                href={item.url}
                style={{
                  paddingLeft: `${item.depth > 1 ? item.depth * 0.5 : 0}rem`,
                }}
              >
                {item.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

TableOfContents.displayName = 'TableOfContents'

export { TableOfContents }
