import { describe, expect, it } from 'vitest';
import type { IntlShape } from 'react-intl';
import { areasSchema } from './Areas/schema';
import { colaboradoresSchema } from './Colaboradores/schema';
import { gestorSchema } from './Gestor/schema';

// Devolve a mensagem padrão, como o react-intl faz sem tradução carregada.
const intl = {
  formatMessage: ({ defaultMessage }: { defaultMessage: string }) =>
    defaultMessage,
} as unknown as IntlShape;

describe.each([
  ['areasSchema', areasSchema, 'Áreas'],
  ['colaboradoresSchema', colaboradoresSchema, 'Colaboradores'],
  ['gestorSchema', gestorSchema, 'Gestor'],
])('%s', (_name, schema, title) => {
  const result = schema({ intl } as any);

  it('usa o nome do bloco como título do schema', () => {
    expect(result.title).toBe(title);
  });

  it('tem apenas o campo título, no fieldset padrão', () => {
    expect(result.fieldsets).toEqual([
      { id: 'default', title: 'Default', fields: ['title'] },
    ]);
    expect(Object.keys(result.properties)).toEqual(['title']);
  });

  it('exige o título e usa o nome do bloco como valor padrão', () => {
    expect(result.required).toEqual(['title']);
    expect(result.properties.title).toEqual({
      title: 'Título',
      default: title,
    });
  });
});
