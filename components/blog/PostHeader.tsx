import { memo, useMemo } from 'react'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'

type PostHeaderProps = {
  date: string
  title: string
}

const POST_DATE_TEMPLATE: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const PostHeader = memo(({ date, title }: PostHeaderProps) => {
  const formattedDate = useMemo(
    () => new Date(date).toLocaleDateString(siteMetadata.locale, POST_DATE_TEMPLATE),
    [date]
  )

  return (
    <header className={'pt-6 xl:pb-6'}>
      <div className={'space-y-1 text-center'}>
        <dl className={'space-y-10'}>
          <div>
            <dt className={'sr-only'}>Published on</dt>
            <dd className={'font-medium text-base text-gray-500 leading-6 dark:text-gray-400'}>
              <time dateTime={date}>{formattedDate}</time>
            </dd>
          </div>
        </dl>
        <div>
          <PageTitle>{title}</PageTitle>
        </div>
      </div>
    </header>
  )
})

PostHeader.displayName = 'PostHeader'

export { PostHeader }
