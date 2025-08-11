'use client'

import tagData from 'app/tag-data.json'
import type { Blog } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
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

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className={'pt-6 pb-6'}>
        <h1
          className={
            'font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100'
          }
        >
          {title}
        </h1>
      </div>
      <div className={'flex sm:space-x-24'}>
        <div
          className={
            'scrollbar scrollbar-w-2 scrollbar-thumb hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40'
          }
        >
          <div className={'px-6 py-4'}>
            {pathname.startsWith('/blog') ? (
              <h3 className={'font-bold text-primary-500 uppercase'}>All Posts</h3>
            ) : (
              <Link
                className={
                  'font-bold text-gray-700 uppercase hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500'
                }
                href={`/blog`}
              >
                All Posts
              </Link>
            )}
            <ul>
              {sortedTags.map(t => {
                return (
                  <li className={'my-3'} key={t}>
                    {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                      <h3 className={'inline px-3 py-2 font-bold text-primary-500 text-sm'}>
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        aria-label={`View posts tagged ${t}`}
                        className={
                          'px-3 py-2 font-medium text-gray-500 text-sm hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500'
                        }
                        href={`/tags/${slug(t)}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div>
          <ul>
            {displayPosts.map(post => {
              const { path, date, title, summary, tags } = post
              return (
                <li className={'py-5'} key={path}>
                  <article className={'flex flex-col space-y-2 xl:space-y-0'}>
                    <dl>
                      <dt className={'sr-only'}>Published on</dt>
                      <dd
                        className={
                          'font-medium text-base text-gray-500 leading-6 dark:text-gray-400'
                        }
                      >
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className={'space-y-3'}>
                      <div>
                        <h2 className={'font-bold text-2xl leading-8 tracking-tight'}>
                          <Link className={'text-gray-900 dark:text-gray-100'} href={`/${path}`}>
                            {title}
                          </Link>
                        </h2>
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
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
