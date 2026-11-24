// The publisher runs cf from this directory with an explicit static asset directory.
export default {
  worker: {
    name: 'docs-fork-previews',
    compatibilityDate: '2026-11-24',
    workersDev: false,
    previewUrls: true,
    assets: { notFoundHandling: '404-page' },
  },
};
