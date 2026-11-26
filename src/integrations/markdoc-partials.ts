import { realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

function isPathInside(root: string, candidate: string) {
  const relative = path.relative(root, candidate);
  return (
    relative === '' ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== '..' &&
      !path.isAbsolute(relative))
  );
}

export default function markdocContentPathContainment(
  contentRoot: string | URL,
) {
  return {
    name: 'fossbilling-markdoc-content-path-containment',
    enforce: 'pre',

    async resolveId(source, importer) {
      // Generated Markdoc modules also import config, components, and runtime
      // packages. The partial schema restricts file reads to .mdoc paths.
      if (
        !importer ||
        path.extname(importer.replace(/[?#].*$/, '')) !== '.mdoc' ||
        !source.endsWith('.mdoc')
      ) {
        return null;
      }

      const resolved = await this.resolve(source, importer, { skipSelf: true });
      if (!resolved) {
        return null;
      }

      // Match Astro's URL conversion before checking the real path. This also
      // covers encoded paths and symlinks; an unreadable path must fail closed.
      const fileId = resolved.id.startsWith('/')
        ? resolved.id
        : `/${resolved.id}`;
      const resolvedPath = fileURLToPath(new URL(fileId, 'file://'));
      const [root, target] = await Promise.all([
        realpath(contentRoot),
        realpath(resolvedPath),
      ]);

      if (!isPathInside(root, target)) {
        this.error(
          `Markdoc partial ${JSON.stringify(source)} resolves outside the documentation root.`,
        );
      }

      return resolved;
    },
  } satisfies Plugin;
}

const INVALID_PARTIAL_PATH = {
  id: 'partial-file-path-invalid',
  level: 'error' as const,
  message:
    'Partial files must use an explicit relative path to a Markdoc (.mdoc) file.',
};

export function validatePartialFilePath(value: unknown) {
  if (
    typeof value !== 'string' ||
    (!value.startsWith('./') && !value.startsWith('../')) ||
    value.includes('\\') ||
    value.includes('\0') ||
    value.includes('?') ||
    value.includes('#') ||
    !value.endsWith('.mdoc')
  ) {
    return [INVALID_PARTIAL_PATH];
  }

  return [];
}
