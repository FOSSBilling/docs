// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.fossbilling.org',
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
          link: '/',
        },
        {
          label: 'Getting Started',
          items: [
            {
              label: 'Overview',
              link: '/getting-started/',
            },
            {
              label: 'Requirements',
              link: '/getting-started/requirements',
            },
            {
              label: 'Standard Installation',
              link: '/getting-started/installation',
            },
            { label: 'Docker Installation', link: '/getting-started/docker' },
            {
              label: 'Building from Source',
              link: '/getting-started/building',
            },
          ],
        },
        {
          label: 'Admin Guide',
          items: [
            {
              label: 'Overview',
              link: '/admin-guide/',
            },
            {
              label: 'Configuration',
              link: '/admin-guide/config',
            },
            {
              label: 'Company Information',
              link: '/admin-guide/company',
            },
            {
              label: 'Email Templates',
              link: '/admin-guide/email-templates',
            },
            {
              label: 'Localization',
              link: '/admin-guide/localization',
            },
            {
              label: 'Invoice PDFs',
              link: '/admin-guide/invoice-pdf',
            },
            {
              label: 'Product Types',
              items: [
                { label: 'Overview', link: '/admin-guide/product-types/' },
                {
                  label: 'Hosting',
                  link: '/admin-guide/product-types/hosting/',
                },
                {
                  label: 'Domains',
                  link: '/admin-guide/product-types/domains/',
                },
                {
                  label: 'Downloadable Products',
                  link: '/admin-guide/product-types/downloadable/',
                },
                {
                  label: 'Licenses',
                  link: '/admin-guide/product-types/license/',
                },
                {
                  label: 'API Keys',
                  link: '/admin-guide/product-types/apikeys/',
                },
              ],
            },
            {
              label: 'Server Managers',
              items: [
                { label: 'Overview', link: '/admin-guide/server-managers/' },
                {
                  label: 'WHM/cPanel',
                  link: '/admin-guide/server-managers/whm/',
                },
                {
                  label: 'HestiaCP',
                  link: '/admin-guide/server-managers/hestiacp/',
                },
                { label: 'CWP', link: '/admin-guide/server-managers/cwp/' },
                {
                  label: 'Other Server Managers',
                  link: '/admin-guide/server-managers/others/',
                },
              ],
            },
          ],
        },
        {
          label: 'Maintenance',
          items: [
            {
              label: 'Overview',
              link: '/maintenance/',
            },
            {
              label: 'Updating',
              link: '/maintenance/updating/',
            },
            {
              label: 'Manual Password Reset',
              link: '/maintenance/admin-manual-reset/',
            },
            { label: 'Troubleshooting', link: '/maintenance/troubleshooting' },
            { label: 'Error Reporting', link: '/support/error-reporting/' },
            { label: 'Changelog', link: '/maintenance/changelog' },
          ],
        },
        {
          label: 'Security',
          items: [
            {
              label: 'Overview',
              link: '/security/',
            },
            {
              label: 'Securing FOSSBilling',
              link: '/security/securing-fossbilling/',
            },
            { label: 'Best Practices', link: '/security/best-practices/' },
            { label: 'Reporting a Vulnerability', link: '/security/report/' },
          ],
        },
        {
          label: 'Extensions & Development',
          items: [
            {
              label: 'Overview',
              link: '/extensions-and-development/',
            },
            {
              label: 'Extensions',
              link: '/extensions-and-development/extensions',
            },
            {
              label: 'API Reference',
              link: '/extensions-and-development/api/',
            },
            {
              label: 'JavaScript Wrapper',
              link: '/extensions-and-development/javascript/',
            },
            {
              label: 'Event Hooks',
              link: '/extensions-and-development/event-hooks/',
            },
            {
              label: 'Twig Filters & Functions',
              link: '/extensions-and-development/twig-filters/',
            },
            {
              label: 'File Structure',
              link: '/extensions-and-development/file-structure/',
            },
            {
              label: 'Guides',
              items: [
                {
                  label: 'Creating a Module',
                  link: '/extensions-and-development/guides/creating-a-module/',
                },
                {
                  label: 'Creating a Payment Gateway',
                  link: '/extensions-and-development/guides/creating-a-payment-gateway/',
                },
                {
                  label: 'Creating a Registrar Integration',
                  link: '/extensions-and-development/guides/creating-a-registrar-integration/',
                },
                {
                  label: 'Creating a Server Manager',
                  link: '/extensions-and-development/guides/creating-a-server-manager/',
                },
                {
                  label: 'Creating a Theme',
                  link: '/extensions-and-development/guides/creating-a-theme/',
                },
              ],
            },
          ],
        },
        {
          label: 'Support',
          items: [
            { label: 'Overview', link: '/support/' },
            { label: 'Error Reporting', link: '/support/error-reporting/' },
            { label: 'Features & Functionality', link: '/support/features/' },
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
