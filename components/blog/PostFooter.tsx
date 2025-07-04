import { memo, useMemo } from 'react';
import Tag from '@/components/Tag';
import Link from '@/components/Link';

type PostFooterProps = {
  tags: string[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  path: string;
};

const PostFooter = memo(({ tags, path, prev, next }: PostFooterProps) => {
  const basePath = useMemo(() => path.split('/')[0], [path]);

  return (
    <footer className={'xl:sticky xl:top-31 xl:flex-col'}>
      <div
        className={
          'divide-gray-200 text-sm leading-5 font-medium xl:divide-y dark:divide-gray-700'
        }
      >
        {tags && (
          <div className={'py-4 xl:py-8'}>
            <h2
              className={
                'text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'
              }
            >
              Tags
            </h2>
            <div className={'flex flex-wrap'}>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
        )}
        {(next || prev) && (
          <div
            className={
              'flex justify-between py-4 xl:block xl:space-y-8 xl:py-8'
            }
          >
            {prev && prev.path && (
              <div>
                <h2
                  className={
                    'text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'
                  }
                >
                  Previous Article
                </h2>
                <div
                  className={
                    'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  }
                >
                  <Link href={`/${prev.path}`}>{prev.title}</Link>
                </div>
              </div>
            )}
            {next && next.path && (
              <div>
                <h2
                  className={
                    'text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'
                  }
                >
                  Next Article
                </h2>
                <div
                  className={
                    'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  }
                >
                  <Link href={`/${next.path}`}>{next.title}</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={'pt-4 xl:pt-8'}>
        <Link
          href={`/${basePath}`}
          className={
            'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
          }
          aria-label={'Back to the blog'}
        >
          &larr; Back to the blog
        </Link>
      </div>
    </footer>
  );
});

PostFooter.displayName = 'PostFooter';

export { PostFooter };
