import { memo } from 'react';

type BlankProps = {};

const Blank = memo(({}: BlankProps) => {
  return <svg className={'h-6 w-6'} />;
});

Blank.displayName = 'Blank';

export { Blank };
