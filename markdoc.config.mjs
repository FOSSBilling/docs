import { Markdoc, nodes } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';
import { validatePartialFilePath } from './src/integrations/markdoc-partials.ts';

const config = starlightMarkdoc();
const { fence } = config.nodes;
// Reuse Markdoc's process option for literal Twig examples.
config.nodes.fence = {
  ...fence,
  attributes: { ...fence.attributes, process: nodes.fence.attributes.process },
};

const partial = Markdoc.tags.partial;
config.tags = {
  ...config.tags,
  partial: {
    ...partial,
    attributes: {
      ...partial.attributes,
      file: {
        ...partial.attributes.file,
        validate: validatePartialFilePath,
      },
    },
  },
};

export default config;
