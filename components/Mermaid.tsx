'use client';

import { useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Clipboard } from '@/components/icons';

type MermaidProps = {
  chart: string;
};

const Mermaid = ({ chart }: MermaidProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const uniqueId = useId();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const renderMermaid = async () => {
    if (ref.current) {
      try {
        const { svg } = await mermaid.render(uniqueId, chart);
        ref.current.innerHTML = svg;
      } catch (error) {
        console.error('Mermaid render error:', error);
        ref.current.innerHTML = `<pre class="text-red-500">Mermaid 渲染失败：${String(error)}</pre>`;
      }
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      mermaid.initialize({ startOnLoad: false });
      initialized.current = true;
    }

    const raf = requestAnimationFrame(renderMermaid);
    return () => cancelAnimationFrame(raf);
  }, [chart, uniqueId]);

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
          className={`absolute top-2 right-2 size-8 cursor-pointer rounded border-2 bg-transparent p-1 ${
            copied
              ? 'border-green-400 focus:border-green-400 focus:outline-none'
              : 'border-gray-700 dark:border-gray-300'
          }`}
          onClick={handleCopy}
        >
          <Clipboard copied={copied} />
        </button>
      )}
    </div>
  );
};

Mermaid.displayName = 'Mermaid';

export { Mermaid };
