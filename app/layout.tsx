import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import { type SearchConfig, SearchProvider } from 'pliny/search'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      className={`${space_grotesk.variable} scrollbar scrollbar-thumb overflow-auto scroll-smooth`}
      lang={siteMetadata.language}
      suppressHydrationWarning
    >
      <link
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
        rel={'apple-touch-icon'}
        sizes={'76x76'}
      />
      <link
        href={`${basePath}/static/favicons/favicon-96x96.png`}
        rel={'icon'}
        sizes={'96x96'}
        type={'image/png'}
      />
      <link href={`${basePath}/static/favicons/site.webmanifest`} rel={'manifest'} />
      <meta content={'#000000'} name={'msapplication-TileColor'} />
      <meta content={'#fff'} media={'(prefers-color-scheme: light)'} name={'theme-color'} />
      <meta content={'#000'} media={'(prefers-color-scheme: dark)'} name={'theme-color'} />
      <link href={`${basePath}/feed.xml`} rel={'alternate'} type={'application/rss+xml'} />
      <body
        className={
          'bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white'
        }
      >
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className={'mb-auto'}>{children}</main>
            </SearchProvider>
            <Footer />
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
