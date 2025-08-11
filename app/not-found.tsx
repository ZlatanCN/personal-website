import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div
      className={
        'flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6'
      }
    >
      <div className={'space-x-2 pt-6 pb-8 md:space-y-5'}>
        <h1
          className={
            'font-extrabold text-6xl text-gray-900 leading-9 tracking-tight md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100'
          }
        >
          404
        </h1>
      </div>
      <div className={'max-w-md'}>
        <p className={'mb-4 font-bold text-xl leading-normal md:text-2xl'}>
          Sorry we couldn&#39;t find this page.
        </p>
        <p className={'mb-8'}>
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          className={
            'inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 font-medium text-sm text-white leading-5 shadow-xs transition-colors duration-150 hover:bg-blue-700 focus:shadow-outline-blue focus:outline-hidden dark:hover:bg-blue-500'
          }
          href={'/'}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
