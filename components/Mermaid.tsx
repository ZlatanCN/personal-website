'use client';

import { memo, useEffect, useId, useRef } from 'react';
import mermaid from 'mermaid';

type MermaidProps = {
  chart: string;
};

const Mermaid = memo(({ chart }: MermaidProps) => {
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

  return <div ref={ref} className={'my-7 flex items-center'} />;
});

Mermaid.displayName = 'Mermaid';

export { Mermaid };
