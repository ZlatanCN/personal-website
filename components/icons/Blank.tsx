import { memo } from 'react';

const Blank = memo(() => {
  return <svg className={'h-6 w-6'} />;
});

Blank.displayName = 'Blank';

export { Blank };
