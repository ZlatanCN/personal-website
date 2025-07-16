'use client';

import { memo, useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Clipboard } from '@/components/icons/Clipboard';

type MermaidProps = {
  chart: string;
};

const Mermaid = memo(({ chart }: MermaidProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({});
      mermaid.render(uniqueId, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart, uniqueId]);

  useEffect(() => {
    console.log('copied state:', copied);
  }, [copied]);

  return (
    <div
      className={'relative my-7'}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => {
        setShowButton(false);
        setCopied(false);
      }}
    >
      <div ref={ref} className={'flex items-center'} />
      {showButton && (
        <button
          className={`absolute top-2 right-2 h-8 w-8 cursor-pointer rounded border-2 bg-transparent p-1 ${copied ? 'border-green-400 focus:border-green-400 focus:outline-none' : 'border-gray-700 dark:border-gray-300'}`}
        >
          <Clipboard onClick={() => setCopied(true)} copied={copied} />
        </button>
      )}
    </div>
  );
});

Mermaid.displayName = 'Mermaid';

export { Mermaid };
