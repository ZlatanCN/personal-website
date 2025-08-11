'use client'

import type { Authors, Blog } from 'contentlayer/generated'
import type { TocItem } from 'pliny/mdx-plugins/remark-toc-headings'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { type ReactNode, useEffect, useState } from 'react'
import { AuthorDetails, PostBody, PostFooter, PostHeader, TableOfContents } from '@/components/blog'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, toc } = content
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute('id') || '')
          }
        })
      },
      {
        rootMargin: '-128px 0px -75% 0px',
      }
    )

    const headingElements = toc
      .map((item: TocItem) => {
        const id = item.url.slice(1)
        return document.getElementById(id)
      })
      .filter((heading: HTMLElement | null) => heading !== null)

    headingElements.forEach((heading: HTMLElement) => observer.observe(heading))

    return () => {
      headingElements.forEach((heading: HTMLElement) => observer.unobserve(heading))
      observer.disconnect()
    }
  }, [toc])

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className={'xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'}>
          <PostHeader date={date} title={title} />
          <section
            className={
              'grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-5 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700'
            }
          >
            <aside
              className={
                'divide-y divide-gray-200 xl:col-span-1 xl:divide-none dark:divide-gray-700'
              }
            >
              <AuthorDetails authorDetails={authorDetails} />
              <PostFooter next={next} path={path} prev={prev} tags={tags} />
            </aside>
            <main className={'xl:col-span-3'}>
              <PostBody filePath={filePath} path={path} slug={slug}>
                {children}
              </PostBody>
            </main>
            <aside className={'xl:col-span-1'}>
              <TableOfContents activeId={activeId} toc={toc} />
            </aside>
          </section>
        </div>
      </article>
    </SectionContainer>
  )
}
