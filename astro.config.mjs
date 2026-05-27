// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.fossbilling.org',
  integrations: [
    starlight({
      title: 'FOSSBilling Docs',
      description:
        'Official FOSSBilling documentation for installation, maintenance, customization, and development.',
      logo: {
        light: './src/assets/logo-black.svg',
        dark: './src/assets/logo-white.svg',
        alt: 'FOSSBilling',
        replacesTitle: true,
      },
      customCss: ['./src/styles/fossbilling.css'],
      components: {
        Header: './src/components/starlight/Header.astro',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      editLink: {
        baseUrl: 'https://github.com/FOSSBilling/docs/edit/main/',
      },
      sidebar: [
        {
          label: 'Introduction',
          slug: '',
        },
        {
          label: 'Getting Started',
          items: [{ autogenerate: { directory: 'getting-started' } }],
        },
        {
          label: 'Admin Guide',
          items: [
            {
              label: 'Overview',
              slug: 'admin-guide',
            },
            {
              label: 'Configuration',
              slug: 'admin-guide/config',
            },
            {
              label: 'Company Information',
              slug: 'admin-guide/company',
            },
            {
              label: 'Email Templates',
              slug: 'admin-guide/email-templates',
            },
            {
              label: 'Localization',
              slug: 'admin-guide/localization',
            },
            {
              label: 'Invoice PDFs',
              slug: 'admin-guide/invoice-pdf',
            },
            {
              label: 'Custom Payment Gateway',
              slug: 'admin-guide/custom-payment-gateway',
            },
            {
              label: 'Product Types',
              collapsed: true,
              items: [
                { autogenerate: { directory: 'admin-guide/product-types' } },
              ],
            },
            {
              label: 'Server Managers',
              collapsed: true,
              items: [
                { autogenerate: { directory: 'admin-guide/server-managers' } },
              ],
            },
          ],
        },
        {
          label: 'Maintenance',
          items: [{ autogenerate: { directory: 'maintenance' } }],
        },
        {
          label: 'Security',
          items: [{ autogenerate: { directory: 'security' } }],
        },
        {
          label: 'Extensions & Development',
          items: [
            {
              label: 'Overview',
              slug: 'extensions-and-development',
            },
            {
              label: 'Extensions',
              slug: 'extensions-and-development/extensions',
            },
            {
              label: 'API Reference',
              slug: 'extensions-and-development/api',
            },
            {
              label: 'JavaScript Wrapper',
              slug: 'extensions-and-development/javascript',
            },
            {
              label: 'Event Hooks',
              slug: 'extensions-and-development/event-hooks',
            },
            {
              label: 'Twig Filters & Functions',
              slug: 'extensions-and-development/twig-filters',
            },
            {
              label: 'File Structure',
              slug: 'extensions-and-development/file-structure',
            },
            {
              label: 'Guides',
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: 'extensions-and-development/guides',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Support',
          items: [{ autogenerate: { directory: 'support' } }],
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/FOSSBilling/FOSSBilling',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://fossbilling.org/discord',
        },
      ],
      lastUpdated: true,
      pagination: true,
    }),
    markdoc(),
  ],
});
