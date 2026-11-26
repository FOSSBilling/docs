import assert from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  realpath,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test, { type TestContext } from 'node:test';
import { pathToFileURL } from 'node:url';
import type { ContentEntryType, HookParameters } from 'astro';
import type { Rolldown } from 'vite';
import markdoc from '@astrojs/markdoc';

import markdocContentPathContainment, {
  validatePartialFilePath,
} from './markdoc-partials.ts';

async function createFixture(t: TestContext) {
  const root = await mkdtemp(
    path.join(os.tmpdir(), 'fossbilling-markdoc-paths-'),
  );
  const contentRoot = path.join(root, 'src/content/docs');
  const outsideRoot = path.join(root, 'outside');

  await Promise.all([
    mkdir(contentRoot, { recursive: true }),
    mkdir(outsideRoot, { recursive: true }),
  ]);

  const importer = path.join(contentRoot, 'guide.mdoc');
  const partial = path.join(contentRoot, '_partial.mdoc');
  const outside = path.join(outsideRoot, 'secret.mdoc');

  await Promise.all([
    writeFile(importer, '# Guide\n'),
    writeFile(partial, 'Safe partial\n'),
    writeFile(outside, 'secret\n'),
  ]);

  t.after(() => rm(root, { recursive: true, force: true }));

  return { root, contentRoot, importer, partial, outside };
}

function createContext(resolvedId: string) {
  const context: Partial<Rolldown.PluginContext> = {
    async resolve() {
      return {
        id: resolvedId,
        external: false,
        moduleSideEffects: true,
        meta: {},
        attributes: {},
      };
    },
    error(message) {
      throw new Error(typeof message === 'string' ? message : message.message);
    },
  };
  return context as Rolldown.PluginContext;
}

test('allows Markdoc partials under the content root', async (t) => {
  const fixture = await createFixture(t);
  const plugin = markdocContentPathContainment(fixture.contentRoot);

  const result = await plugin.resolveId.call(
    createContext(fixture.partial),
    './_partial.mdoc',
    `${fixture.importer}?content`,
  );

  assert.equal(result?.id, fixture.partial);
});

test('rejects a resolved path outside the documentation root', async (t) => {
  const fixture = await createFixture(t);
  const plugin = markdocContentPathContainment(fixture.contentRoot);

  await assert.rejects(
    plugin.resolveId.call(
      createContext(fixture.outside),
      '../../../../outside/secret.mdoc',
      fixture.importer,
    ),
    /outside the documentation root/,
  );
});

test('rejects a symlink that escapes the documentation root', async (t) => {
  const fixture = await createFixture(t);
  const linkedPath = path.join(fixture.contentRoot, '_linked.mdoc');
  await symlink(fixture.outside, linkedPath);
  const plugin = markdocContentPathContainment(fixture.contentRoot);

  assert.equal(await realpath(linkedPath), await realpath(fixture.outside));
  await assert.rejects(
    plugin.resolveId.call(
      createContext(linkedPath),
      './_linked.mdoc',
      fixture.importer,
    ),
    /outside the documentation root/,
  );
});

test('checks the URL-decoded path that Astro reads', async (t) => {
  const fixture = await createFixture(t);
  const plugin = markdocContentPathContainment(fixture.contentRoot);
  const encodedPath = `${fixture.contentRoot}/%2e%2e/%2e%2e/%2e%2e/outside/secret.mdoc`;

  await assert.rejects(
    plugin.resolveId.call(
      createContext(encodedPath),
      './encoded.mdoc',
      fixture.importer,
    ),
    /outside/,
  );
});

test('ignores resolution requests from non-Markdoc importers', async (t) => {
  const fixture = await createFixture(t);
  const plugin = markdocContentPathContainment(fixture.contentRoot);
  const context: Partial<Rolldown.PluginContext> = {
    async resolve() {
      assert.fail('non-Markdoc resolution should not be intercepted');
    },
  };

  const result = await plugin.resolveId.call(
    context as Rolldown.PluginContext,
    './_partial.mdoc',
    path.join(fixture.root, 'script.js'),
  );

  assert.equal(result, null);
});

test('ignores generated non-partial imports from Markdoc modules', async (t) => {
  const fixture = await createFixture(t);
  const plugin = markdocContentPathContainment(fixture.contentRoot);
  const context: Partial<Rolldown.PluginContext> = {
    async resolve() {
      assert.fail('non-partial resolution should not be intercepted');
    },
  };

  const result = await plugin.resolveId.call(
    context as Rolldown.PluginContext,
    '/project/markdoc.config.mjs',
    fixture.importer,
  );

  assert.equal(result, null);
});

test('partial path policy allows explicit relative Markdoc files', () => {
  assert.deepEqual(validatePartialFilePath('./_partial.mdoc'), []);
  assert.deepEqual(validatePartialFilePath('../shared/_partial.mdoc'), []);
});

test('partial path policy rejects invalid file paths', () => {
  for (const value of [
    '../../../.gitignore',
    '/etc/passwd',
    'C:\\secrets\\token.mdoc',
    'file:///etc/secret.mdoc',
    './partial.txt',
    './partial.mdoc?raw',
    './partial.mdoc#fragment',
    './secret?raw.mdoc',
    './secret#raw.mdoc',
    './bad\0name.mdoc',
    './bad\\name.mdoc',
    123,
    null,
  ]) {
    assert.match(validatePartialFilePath(value)[0].message, /relative path/);
  }
});

test('Astro validates and contains nested partials before reading them', async (t) => {
  const fixture = await createFixture(t);
  const plugin = markdocContentPathContainment(fixture.contentRoot);
  let entryType: ContentEntryType;
  // Supply only the setup hooks used by Markdoc; Astro keeps addContentEntryType
  // out of its public HookParameters type.
  await markdoc().hooks['astro:config:setup']!({
    config: { root: new URL('../../', import.meta.url) },
    addContentEntryType(value: ContentEntryType) {
      entryType = value;
    },
    updateConfig() {},
  } as unknown as HookParameters<'astro:config:setup'>);

  const context = {
    meta: { watchMode: false },
    resolve(source: string, importer: string) {
      return plugin.resolveId.call(
        createContext(path.resolve(path.dirname(importer), source)),
        source,
        importer,
      );
    },
  };
  const render = async () =>
    entryType.getRenderModule!.call(context as Rolldown.PluginContext, {
      contents: '{% partial file="./nested/_include.mdoc" /%}',
      fileUrl: pathToFileURL(fixture.importer),
      viteId: fixture.importer,
    });
  const nested = path.join(fixture.contentRoot, 'nested/_include.mdoc');
  await mkdir(path.dirname(nested));

  await t.test('renders nested partials within the root', async () => {
    await writeFile(nested, '{% partial file="../_partial.mdoc" /%}');
    const result = await render();
    assert.ok(result && typeof result === 'object');
    assert.match(result.code, /Safe partial/);
  });

  await t.test('rejects nested traversal outside the root', async () => {
    await writeFile(
      nested,
      '{% partial file="../../../../outside/secret.mdoc" /%}',
    );
    await assert.rejects(render(), /Could not read partial file/);
  });

  await t.test('rejects a nested symlink outside the root', async () => {
    await symlink(
      fixture.outside,
      path.join(path.dirname(nested), '_link.mdoc'),
    );
    await writeFile(nested, '{% partial file="./_link.mdoc" /%}');
    await assert.rejects(render(), /Could not read partial file/);
  });

  await t.test('validates nested partial file attributes', async () => {
    await writeFile(nested, '{% partial file="./secret.txt" /%}');
    await assert.rejects(render(), /explicit relative path/);
  });

  await t.test(
    'rejects query and fragment suffixes hiding a non-Markdoc file',
    async () => {
      await writeFile(
        path.join(path.dirname(nested), 'secret.txt'),
        'Not a partial',
      );
      for (const suffix of ['?raw.mdoc', '#raw.mdoc']) {
        await writeFile(nested, `{% partial file="./secret.txt${suffix}" /%}`);
        await assert.rejects(render(), /explicit relative path/);
      }
    },
  );
});
