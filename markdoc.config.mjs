import { nodes } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';

const config = starlightMarkdoc();
const { fence } = config.nodes;
// Reuse Markdoc's process option for literal Twig examples.
config.nodes.fence = {
  ...fence,
  attributes: { ...fence.attributes, process: nodes.fence.attributes.process },
};

export default config;
