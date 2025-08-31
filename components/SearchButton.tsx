import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper aria-label={'Search'}>
        <svg
          className={
            'h-6 w-6 cursor-pointer text-gray-900 transition-colors duration-300 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400'
          }
          fill={'none'}
          stroke={'currentColor'}
          strokeWidth={1.5}
          viewBox={'0 0 24 24'}
          xmlns={'http://www.w3.org/2000/svg'}
        >
          <title>Search</title>
          <path
            d={'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
          />
        </svg>
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
