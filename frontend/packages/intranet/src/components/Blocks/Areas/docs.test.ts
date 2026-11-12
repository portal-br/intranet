import { readFileSync } from 'fs';
import { createRequire } from 'module';
import path from 'path';
import { createIntl } from 'react-intl';
import { describe, expect, it } from 'vitest';
import type { BlockSchemaArgs } from '@plone/types';
import { areasSchema } from './schema';

// The same loader that the Volto build uses to collect the block docs.
const require = createRequire(import.meta.url);
const { findBlocksDocs } = require('@plone/registry/create-blocks-docs-loader');

// react-intl and @plone/types declare different IntlShape types.
const intl = createIntl({
  locale: 'en',
  messages: {},
}) as unknown as BlockSchemaArgs['intl'];
const SRC_DIR = path.resolve(__dirname, '..', '..', '..');
const DOCS_FILE = path.join(__dirname, 'docs.block.md');

/** Extrai o primeiro bloco ```json do arquivo de documentação. */
const docsExample = (): Record<string, any> => {
  const markdown = readFileSync(DOCS_FILE, 'utf-8');
  const json = markdown.match(/```json\n([\s\S]*?)\n```/)?.[1];
  return JSON.parse(json ?? 'null');
};

describe('documentação do bloco areasBlock', () => {
  it('é coletada pelo build como documentação de areasBlock', () => {
    const found = findBlocksDocs([SRC_DIR]).find(
      (source) => source.block === 'areasBlock',
    );
    expect(found?.path).toBe(DOCS_FILE);
    expect(found?.variation).toBeUndefined();
  });

  it('tem um exemplo completo com o @type do bloco', () => {
    const example = docsExample();
    expect(example['@type']).toBe('areasBlock');
    expect(example.title).toBe('Áreas');
  });

  it('o exemplo só usa campos que o schema do bloco define', () => {
    const example = docsExample();
    const { properties } = areasSchema({ intl });
    for (const key of Object.keys(example)) {
      if (key === '@type') continue;
      expect(properties).toHaveProperty(key);
    }
  });
});

describe('schema do endpoint @blocks-schema', () => {
  it('monta o schema só com intl, como o endpoint chama', () => {
    const schema = areasSchema({ intl });
    expect(schema.title).toBe('Áreas');
    expect(schema.required).toEqual(['title']);
  });
});
