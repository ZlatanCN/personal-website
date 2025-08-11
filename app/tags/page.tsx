import { genPageMetadata } from 'app/seo'
import tagData from 'app/tag-data.json'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div
      className={
        'flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700'
      }
    >
      <div className={'space-x-2 pt-6 pb-8 md:space-y-5'}>
        <h1
          className={
            'font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100'
          }
        >
          Tags
        </h1>
      </div>
      <div className={'flex max-w-lg flex-wrap'}>
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map(t => {
          return (
            <div className={'mt-2 mr-5 mb-2'} key={t}>
              <Tag text={t} />
              <Link
                aria-label={`View posts tagged ${t}`}
                className={'-ml-2 font-semibold text-gray-600 text-sm uppercase dark:text-gray-300'}
                href={`/tags/${slug(t)}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
