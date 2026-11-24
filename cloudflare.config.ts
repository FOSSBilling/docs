import { defineConfig } from 'cf/config';

export default defineConfig(({ isPreview }) => ({
  worker: {
    name: 'docs',
    compatibilityDate: '2026-11-24',
    compatibilityFlags: ['global_fetch_strictly_public'],
    workersDev: false,
    previewUrls: false,
    observability: {
      ...(isPreview && { enabled: true }),
      logs: {
        enabled: true,
      },
      traces: {
        enabled: true,
      },
      issues: {
        enabled: true,
      },
    },
    assets: {
      notFoundHandling: '404-page',
    },
    domains: [
      'docs.fossbilling.org',
      {
        hostname: 'docs.fossbilling.foo',
        production: false,
        previews: true,
      },
    ],
  },
}));
