import { memo } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors } from 'contentlayer/generated'

type AuthorDetailsProps = {
  authorDetails: CoreContent<Authors>[]
}

const AuthorDetails = memo(({ authorDetails }: AuthorDetailsProps) => {
  return (
    <dl
      className={
        'pt-6 pb-10 xl:self-start xl:border-b xl:border-gray-200 xl:pt-10 xl:dark:border-gray-700'
      }
    >
      <dt className={'sr-only'}>Authors</dt>
      <dd>
        <ul
          className={
            'flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0'
          }
        >
          {authorDetails.map(author => (
            <li className={'flex items-center space-x-2'} key={author.name}>
              {author.avatar && (
                <Image
                  src={author.avatar}
                  width={38}
                  height={38}
                  alt={'avatar'}
                  loading={'eager'}
                  priority={true}
                  className={'h-10 w-10 rounded-full'}
                />
              )}
              <dl className={'text-sm leading-5 font-medium whitespace-nowrap'}>
                <dt className={'sr-only'}>Name</dt>
                <dd className={'text-gray-900 dark:text-gray-100'}>{author.name}</dd>
                {/*<dt className={'sr-only'}>Twitter</dt>*/}
                {/*<dd>*/}
                {/*  {author.twitter && (*/}
                {/*    <Link*/}
                {/*      href={author.twitter}*/}
                {/*      className={*/}
                {/*        'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'*/}
                {/*      }*/}
                {/*    >*/}
                {/*      {author.twitter*/}
                {/*        .replace('https://twitter.com/', '@')*/}
                {/*        .replace('https://x.com/', '@')}*/}
                {/*    </Link>*/}
                {/*  )}*/}
                {/*</dd>*/}
                <dt className={'sr-only'}>GitHub</dt>
                <dd>
                  {author.github && (
                    <Link
                      href={author.github}
                      className={
                        'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    >
                      {author.github.replace('https://github.com/', '@')}
                    </Link>
                  )}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  )
})

AuthorDetails.displayName = 'AuthorDetails'

export { AuthorDetails }
