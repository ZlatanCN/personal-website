'use client';

import { useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Clipboard } from '@/components/icons';
import { ZoomIn } from '@/components/icons/ZoomIn';

type MermaidProps = {
  chart: string;
};

const Mermaid = ({ chart }: MermaidProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [zoomIn, setZoomIn] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
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

        const svgElement = ref.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxHeight = '90vh';
          svgElement.style.width = svgElement.clientWidth * 1.5 + 'px';
        }
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
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => {
        setShowButtons(false);
        setCopied(false);
      }}
    >
      <div ref={ref} className={'flex items-center'} />
      {showButtons && (
        <div className={'absolute top-2 right-2 flex gap-1'}>
          <button
            className={`size-8 cursor-pointer rounded border-2 bg-transparent p-1 ${
              copied
                ? 'border-green-400 focus:border-green-400 focus:outline-none'
                : 'border-gray-700 dark:border-gray-300'
            }`}
            onClick={handleCopy}
          >
            <Clipboard copied={copied} />
          </button>
          <button
            className={
              'size-8 cursor-pointer rounded border-2 border-gray-700 bg-transparent p-1 dark:border-gray-300'
            }
            onClick={() => {
              setZoomIn(true);
            }}
          >
            <ZoomIn />
          </button>
        </div>
      )}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 dark:bg-gray-950/50 ${
          zoomIn
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setZoomIn(false)}
      >
        <div
          className={`transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 dark:bg-gray-900 ${
            zoomIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
          dangerouslySetInnerHTML={{
            __html: ref.current?.innerHTML ?? '',
          }}
        />
      </div>
    </div>
  );
};

Mermaid.displayName = 'Mermaid';

export { Mermaid };
