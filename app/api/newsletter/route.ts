import { NewsletterAPI } from 'pliny/newsletter';
import siteMetadata from '@/data/siteMetadata';

export const dynamic = 'force-static';

const handler = NewsletterAPI({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  provider: siteMetadata.newsletter.provider,
});

export { handler as GET, handler as POST };
