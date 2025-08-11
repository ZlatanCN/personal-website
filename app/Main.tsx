import type { Blog } from 'contentlayer/generated'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 5

type HomeProps = {
  posts: CoreContent<Blog>[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <div className={'divide-y divide-gray-200 dark:divide-gray-700'}>
        <div className={'space-y-2 pt-6 pb-8 md:space-y-5'}>
          <h1
            className={
              'font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100'
            }
          >
            Latest
          </h1>
          <p className={'text-gray-500 text-lg leading-7 dark:text-gray-400'}>
            {siteMetadata.description}
          </p>
        </div>
        <ul className={'divide-y divide-gray-200 dark:divide-gray-700'}>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map(post => {
            const { slug, date, title, summary, tags } = post
            return (
              <li className={'py-12'} key={slug}>
                <article>
                  <div
                    className={'space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'}
                  >
                    <dl>
                      <dt className={'sr-only'}>Published on</dt>
                      <dd
                        className={
                          'font-medium text-base text-gray-500 leading-6 dark:text-gray-400'
                        }
                      >
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className={'space-y-5 xl:col-span-3'}>
                      <div className={'space-y-6'}>
                        <div>
                          <h2 className={'font-bold text-2xl leading-8 tracking-tight'}>
                            <Link
                              className={'text-gray-900 dark:text-gray-100'}
                              href={`/blog/${slug}`}
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className={'flex flex-wrap'}>
                            {tags.map(tag => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className={'prose max-w-none text-gray-500 dark:text-gray-400'}>
                          {summary}
                        </div>
                      </div>
                      <div className={'font-medium text-base leading-6'}>
                        <Link
                          aria-label={`Read more: "${title}"`}
                          className={
                            'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                          }
                          href={`/blog/${slug}`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className={'flex justify-end font-medium text-base leading-6'}>
          <Link
            aria-label={'All posts'}
            className={'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'}
            href={'/blog'}
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className={'flex items-center justify-center pt-4'}>
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
