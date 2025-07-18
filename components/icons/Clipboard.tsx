import { memo } from 'react';

type ClipboardProps = {
  onClick?: () => void;
  copied: boolean;
};

const Clipboard = memo(({ onClick, copied }: ClipboardProps) => {
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      viewBox={'0 0 24 24'}
      stroke={'currentColor'}
      fill={'none'}
      className={` ${copied ? 'text-green-400' : 'text-gray-700 dark:text-gray-300'}`}
      onClick={onClick}
    >
      <path
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'2'}
        d={`${copied ? 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' : 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'}`}
      ></path>
    </svg>
  );
});

Clipboard.displayName = 'Clipboard';

export { Clipboard };
