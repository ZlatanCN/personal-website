import { memo, ReactNode } from 'react';
import Link from '@/components/Link';
import siteMetadata from '@/data/siteMetadata';
import Comments from '@/components/Comments';

type PostBodyProps = {
  children: ReactNode;
  filePath: string;
  path: string;
  slug: string;
};

const editUrl = (path: string) =>
  `${siteMetadata.siteRepo}/blob/master/data/${path}`;
const discussUrl = (path: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/${path}`,
  )}`;

const PostBody = memo(({ children, slug, path, filePath }: PostBodyProps) => {
  return (
    <div className={'divide-y divide-gray-200 xl:pb-0 dark:divide-gray-700'}>
      <div className={'prose dark:prose-invert max-w-none pt-10 pb-8'}>
        {children}
      </div>
      <div className={'pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300'}>
        {/*<Link href={discussUrl(path)} rel={'nofollow'}>*/}
        {/*  Discuss on Twitter*/}
        {/*</Link>*/}
        {/*{` • `}*/}
        <Link href={editUrl(filePath)}>View on GitHub</Link>
      </div>
      {siteMetadata.comments && (
        <div
          className={'pt-6 pb-6 text-center text-gray-700 dark:text-gray-300'}
          id={'comment'}
        >
          <Comments slug={slug} />
        </div>
      )}
    </div>
  );
});

PostBody.displayName = 'PostBody';

export { PostBody };
