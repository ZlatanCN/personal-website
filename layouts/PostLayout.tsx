import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors, Blog } from 'contentlayer/generated';
import SectionContainer from '@/components/SectionContainer';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import {
  AuthorDetails,
  PostBody,
  PostFooter,
  PostHeader,
  TableOfContents,
} from '@/components/blog';

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, toc } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div
          className={'xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'}
        >
          <PostHeader date={date} title={title} />
          <div
            className={
              'grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-5 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700'
            }
          >
            <div
              className={
                'divide-y divide-gray-200 xl:col-span-1 xl:divide-none dark:divide-gray-700'
              }
            >
              <AuthorDetails authorDetails={authorDetails} />
              <PostFooter path={path} tags={tags} next={next} prev={prev} />
            </div>
            <div className={'xl:col-span-3'}>
              <PostBody filePath={filePath} path={path} slug={slug}>
                {children}
              </PostBody>
            </div>
            <div className={'xl:col-span-1'}>
              <TableOfContents toc={toc} />
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
