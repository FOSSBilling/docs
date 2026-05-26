// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.fossbilling.org',
  redirects: {
    // fossbilling.org docs redirects
    '/maintaining-fossbilling/updating': '/maintenance/updating/',
    '/maintaining-fossbilling/admin-manual-reset':
      '/maintenance/admin-manual-reset/',
    '/changelog': '/maintenance/changelog/',
    '/customizing-fossbilling/config': '/admin-guide/config/',
    '/customizing-fossbilling/localization': '/admin-guide/localization/',
    '/customizing-fossbilling/company': '/admin-guide/company/',
    '/customizing-fossbilling/invoice-pdf': '/admin-guide/invoice-pdf/',
    '/customizing-fossbilling/email-templates': '/admin-guide/email-templates/',
    '/developing-fossbilling/api': '/extensions-and-development/api/',
    '/developing-fossbilling/guides/creating-a-module':
      '/extensions-and-development/guides/creating-a-module/',
    '/developing-fossbilling/guides/creating-a-payment-gateway':
      '/extensions-and-development/guides/creating-a-payment-gateway/',
    '/developing-fossbilling/guides/custom-gateway':
      '/admin-guide/custom-payment-gateway/',
    '/developing-fossbilling/guides/creating-a-registrar-integration':
      '/extensions-and-development/guides/creating-a-registrar-integration/',
    '/developing-fossbilling/guides/creating-a-server-manager':
      '/extensions-and-development/guides/creating-a-server-manager/',
    '/developing-fossbilling/guides/creating-a-theme':
      '/extensions-and-development/guides/creating-a-theme/',
    '/developing-fossbilling/code-of-conduct':
      'https://github.com/FOSSBilling/FOSSBilling/blob/main/CODE_OF_CONDUCT.md',
    '/developing-fossbilling/event-hooks':
      '/extensions-and-development/event-hooks/',
    '/developing-fossbilling/file-structure':
      '/extensions-and-development/file-structure/',
    '/developing-fossbilling/javascript':
      '/extensions-and-development/javascript/',
    '/developing-fossbilling/twig-filters':
      '/extensions-and-development/twig-filters/',
    '/extensions': '/extensions-and-development/extensions/',
    '/faq': '/support/faq/',
    '/faq/error-reporting': '/maintenance/error-reporting/',
    '/faq/features': '/support/features/',
    '/product-types/apikeys': '/admin-guide/product-types/apikeys/',
    '/product-types/domains': '/admin-guide/product-types/domains/',
    '/product-types/downloadable': '/admin-guide/product-types/downloadable/',
    '/product-types/hosting': '/admin-guide/product-types/hosting/',
    '/product-types/license': '/admin-guide/product-types/license/',
    '/troubleshooting': '/maintenance/troubleshooting/',
    '/server-managers/cwp': '/admin-guide/server-managers/cwp/',
    '/server-managers/hestiacp': '/admin-guide/server-managers/hestiacp/',
    '/server-managers/others': '/admin-guide/server-managers/others/',
    '/server-managers/whm': '/admin-guide/server-managers/whm/',
  },
  integrations: [
    starlight({
      title: 'FOSSBilling',
      description:
        'Official FOSSBilling documentation for installation, maintenance, customization, and development.',
      logo: {
        light: '/public/img/wordmark-black.png',
        dark: '/public/img/wordmark-white.png',
        alt: 'FOSSBilling',
        replacesTitle: true,
      },
      customCss: ['/src/styles/fossbilling.css'],
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
          items: [
            { autogenerate: { directory: 'getting-started' } },
          ],
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
          items: [
            { autogenerate: { directory: 'maintenance' } },
          ],
        },
        {
          label: 'Security',
          items: [
            { autogenerate: { directory: 'security' } },
          ],
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
                  }
                },
              ],
            },
          ],
        },
        {
          label: 'Support',
          items: [
            { autogenerate: { directory: 'support' } },
          ],
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
