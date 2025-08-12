import { HEADER_NAV_LINKS } from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import { ThemeSwitch } from './ThemeSwitch'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link aria-label={siteMetadata.headerTitle} href={'/'}>
        <div className={'flex items-center justify-between'}>
          <div className={'mr-3'}>
            <Logo />
          </div>
          <div className={'hidden h-6 font-semibold text-2xl sm:block'}>
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>
      <nav className={'sm:-mr-6 group flex items-center space-x-4 leading-5 sm:space-x-6'}>
        <ul
          className={
            "anchor/hovered-link no-scrollbar after:anchored/hovered-link hidden max-w-40 items-center overflow-x-auto rounded-full border border-gray-200 bg-after-navLink px-4 py-1 after:absolute after:top-anchor-top after:right-anchor-right after:bottom-anchor-bottom after:left-anchor-left after:rounded-xl after:border after:border-transparent after:border-solid after:opacity-0 after:transition-all after:duration-500 after:content-[''] group-has-[a:hover,a:focus-visible]:after:opacity-100 sm:flex md:max-w-72 lg:max-w-96 dark:border-gray-800"
          }
        >
          {HEADER_NAV_LINKS.filter(link => link.href !== '/').map(link => (
            <li key={link.title}>
              <Link
                className={
                  'hover:anchor/hovered-link focus-visible:anchor/hovered-link relative z-10 block px-4 py-2 font-medium text-gray-900 dark:text-gray-100'
                }
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </nav>
    </header>
  )
}

export default Header
