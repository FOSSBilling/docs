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
        Footer: './src/components/starlight/Footer.astro',
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
              label: 'System Requirements',
              link: '/getting-started/requirements',
            },
            {
              label: 'Standard Installation',
              link: '/getting-started/installation',
            },
            { label: 'Docker Installation', link: '/getting-started/docker' },
            {
              label: 'Building FOSSBilling',
              link: '/getting-started/building',
            },
          ],
        },
        {
          label: 'Maintaining FOSSBilling',
          items: [
            {
              label: 'Updating FOSSBilling',
              link: '/maintaining-fossbilling/updating/',
            },
            {
              label: 'Manual Password Reset',
              link: '/maintaining-fossbilling/admin-manual-reset/',
            },
          ],
        },
        {
          label: 'Customizing FOSSBilling',
          items: [
            {
              label: 'Configuration File',
              link: '/customizing-fossbilling/config',
            },
            {
              label: 'Email Templates',
              link: '/customizing-fossbilling/email-templates',
            },
            {
              label: 'Localization',
              link: '/customizing-fossbilling/localization',
            },
            {
              label: 'Company Information',
              link: '/customizing-fossbilling/company',
            },
            {
              label: 'Invoice PDFs',
              link: '/customizing-fossbilling/invoice-pdf',
            },
          ],
        },
        {
          label: 'Developing FOSSBilling',
          items: [
            { label: 'API Reference', link: '/developing-fossbilling/api/' },
            {
              label: 'File Structure',
              link: '/developing-fossbilling/file-structure/',
            },
            {
              label: 'JavaScript Wrapper',
              link: '/developing-fossbilling/javascript/',
            },
            {
              label: 'Event Hooks',
              link: '/developing-fossbilling/event-hooks/',
            },
            {
              label: 'Twig Filters & Functions',
              link: '/developing-fossbilling/twig-filters/',
            },
            {
              label: 'Code of Conduct',
              link: '/developing-fossbilling/code-of-conduct/',
            },
            {
              label: 'Guides',
              items: [
                {
                  label: 'Creating a Module',
                  link: '/developing-fossbilling/guides/creating-a-module/',
                },
                {
                  label: 'Creating a Payment Gateway',
                  link: '/developing-fossbilling/guides/creating-a-payment-gateway/',
                },
                {
                  label: 'Creating a Registrar Integration',
                  link: '/developing-fossbilling/guides/creating-a-registrar-integration/',
                },
                {
                  label: 'Creating a Server Manager',
                  link: '/developing-fossbilling/guides/creating-a-server-manager/',
                },
                {
                  label: 'Creating a Theme',
                  link: '/developing-fossbilling/guides/creating-a-theme/',
                },
                {
                  label: 'Custom Payment Gateway',
                  link: '/developing-fossbilling/guides/custom-gateway/',
                },
              ],
            },
          ],
        },
        {
          label: 'Product Types',
          items: [
            { label: 'Hosting', link: '/product-types/hosting/' },
            { label: 'Domains', link: '/product-types/domains/' },
            { label: 'Downloadable', link: '/product-types/downloadable/' },
            { label: 'License', link: '/product-types/license/' },
            { label: 'API Keys', link: '/product-types/apikeys/' },
          ],
        },
        {
          label: 'Server Managers',
          items: [
            { label: 'CWP', link: '/server-managers/cwp/' },
            { label: 'HestiaCP', link: '/server-managers/hestiacp/' },
            { label: 'WHM/cPanel', link: '/server-managers/whm/' },
            {
              label: 'Other Server Managers',
              link: '/server-managers/others/',
            },
          ],
        },
        {
          label: 'Security',
          items: [
            {
              label: 'Securing FOSSBilling',
              link: '/security/securing-fossbilling/',
            },
            { label: 'Best Practices', link: '/security/best-practices/' },
            { label: 'Reporting a Vulnerability', link: '/security/report/' },
          ],
        },
        {
          label: 'FAQ & Support',
          items: [
            { label: 'Frequently Asked Questions', link: '/faq/' },
            { label: 'Features & Functionality', link: '/faq/features/' },
            { label: 'Error Reporting', link: '/faq/error-reporting/' },
            { label: 'Troubleshooting', link: '/troubleshooting' },
            { label: 'Extensions', link: '/extensions' },
            { label: 'Changelog', link: '/changelog' },
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
