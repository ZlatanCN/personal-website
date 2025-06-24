'use client';

import { memo, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

type MermaidProps = {
  chart: string;
};

const Mermaid = memo(({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({});

      const uniqueId = `mermaid-${new Date().getTime()}`;

      mermaid.render(uniqueId, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return <div ref={ref} className={'flex items-center'} />;
});

Mermaid.displayName = 'Mermaid';

export { Mermaid };
