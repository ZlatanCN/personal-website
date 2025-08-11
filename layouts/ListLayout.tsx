'use client'

import type { Blog } from 'contentlayer/generated'
import { usePathname } from 'next/navigation'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { useState } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const _lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className={'space-y-2 pt-6 pb-8 md:space-y-5'}>
      <nav className={'flex justify-between'}>
        {!prevPage && (
          <button
            className={'cursor-auto disabled:opacity-50'}
            disabled={!prevPage}
            type={'button'}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel={'prev'}
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className={'cursor-auto disabled:opacity-50'}
            disabled={!nextPage}
            type={'button'}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel={'next'}>
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter(post => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className={'divide-y divide-gray-200 dark:divide-gray-700'}>
        <div className={'space-y-2 pt-6 pb-8 md:space-y-5'}>
          <h1
            className={
              'font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100'
            }
          >
            {title}
          </h1>
          <div className={'relative max-w-lg'}>
            <label>
              <span className={'sr-only'}>Search articles</span>
              <input
                aria-label={'Search articles'}
                className={
                  'block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
                }
                onChange={e => setSearchValue(e.target.value)}
                placeholder={'Search articles'}
                type={'text'}
              />
            </label>
            <svg
              className={'absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300'}
              fill={'none'}
              stroke={'currentColor'}
              viewBox={'0 0 24 24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <title>Search</title>
              <path
                d={'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map(post => {
            const { path, date, title, summary, tags } = post
            return (
              <li className={'py-4'} key={path}>
                <article
                  className={'space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'}
                >
                  <dl>
                    <dt className={'sr-only'}>Published on</dt>
                    <dd
                      className={'font-medium text-base text-gray-500 leading-6 dark:text-gray-400'}
                    >
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className={'space-y-3 xl:col-span-3'}>
                    <div>
                      <h3 className={'font-bold text-2xl leading-8 tracking-tight'}>
                        <Link className={'text-gray-900 dark:text-gray-100'} href={`/${path}`}>
                          {title}
                        </Link>
                      </h3>
                      <div className={'flex flex-wrap'}>
                        {tags?.map(tag => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className={'prose max-w-none text-gray-500 dark:text-gray-400'}>
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
