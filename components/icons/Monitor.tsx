import { memo } from 'react';

const Monitor = memo(() => {
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      viewBox={'0 0 20 20'}
      fill={'none'}
      stroke={'currentColor'}
      strokeWidth={'2'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      className={
        'h-6 w-6 opacity-100 transition-opacity duration-300 ease-in-out'
      }
    >
      <rect x={'3'} y={'3'} width={'14'} height={'10'} rx={'2'} ry={'2'}></rect>
      <line x1={'7'} y1={'17'} x2={'13'} y2={'17'}></line>
      <line x1={'10'} y1={'13'} x2={'10'} y2={'17'}></line>
    </svg>
  );
});

Monitor.displayName = 'Monitor';

export { Monitor };
