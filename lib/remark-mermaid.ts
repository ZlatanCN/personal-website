import { visit } from 'unist-util-visit';

const remarkMermaid = () => {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        node.type = 'mdxJsxFlowElement';
        node.name = 'Mermaid';
        node.attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'chart',
            value: node.value,
          },
        ];
      }
    });
  };
};

export default remarkMermaid;
