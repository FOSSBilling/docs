// Check the DNS label as well as the ref: e.g. PR/123 and pr-123 share a label.
const branch = process.argv[2];
if (!branch) throw new Error('Expected a branch name');
const slug = branch.normalize('NFKD').replace(/\p{Mark}/gu, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
console.log(!/^pr-\d+$/.test(slug) && !slug.startsWith('forkpreview-'));
