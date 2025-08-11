import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import type { ReactNode } from 'react'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { slug, date, title } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div
              className={
                'space-y-1 border-gray-200 border-b pb-10 text-center dark:border-gray-700'
              }
            >
              <dl>
                <div>
                  <dt className={'sr-only'}>Published on</dt>
                  <dd
                    className={'font-medium text-base text-gray-500 leading-6 dark:text-gray-400'}
                  >
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className={
              'grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700'
            }
          >
            <div
              className={
                'divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700'
              }
            >
              <div className={'prose dark:prose-invert max-w-none pt-10 pb-8'}>{children}</div>
            </div>
            {siteMetadata.comments && (
              <div
                className={'pt-6 pb-6 text-center text-gray-700 dark:text-gray-300'}
                id={'comment'}
              >
                <Comments slug={slug} />
              </div>
            )}
            <footer>
              <div
                className={
                  'flex flex-col font-medium text-sm sm:flex-row sm:justify-between sm:text-base'
                }
              >
                {prev?.path && (
                  <div className={'pt-4 xl:pt-8'}>
                    <Link
                      aria-label={`Previous post: ${prev.title}`}
                      className={
                        'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                      href={`/${prev.path}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next?.path && (
                  <div className={'pt-4 xl:pt-8'}>
                    <Link
                      aria-label={`Next post: ${next.title}`}
                      className={
                        'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                      href={`/${next.path}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
