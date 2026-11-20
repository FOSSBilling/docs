import { defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'docs',
    compatibilityDate: '2026-10-01',
    compatibilityFlags: ['global_fetch_strictly_public'],
    workersDev: false,
    previewUrls: true,
    observability: {
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
    domains: ['docs.fossbilling.org'],
  },
});
