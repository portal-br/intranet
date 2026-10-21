import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tags from './Tags';

const renderTags = (tags?: string[] | null) =>
  render(
    <MemoryRouter>
      <Tags tags={tags} />
    </MemoryRouter>,
  );

describe('Tags', () => {
  it.each([[undefined], [null], [[]], [['Área']]])(
    'não renderiza a lista quando não há tags a exibir (%j)',
    (tags) => {
      const { container } = renderTags(tags);
      expect(container.querySelector('.tags')).toBeNull();
    },
  );

  it('remove a tag Área e liga as demais à busca', () => {
    const { container } = renderTags(['RH', 'Área', 'Financeiro']);
    const links = [...container.querySelectorAll('a.tag')];

    expect(links.map((link) => link.textContent)).toEqual(['RH', 'Financeiro']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/search?Subject=RH',
      '/search?Subject=Financeiro',
    ]);
  });

  it('separa as tags com vírgula, sem vírgula depois da última', () => {
    const { container } = renderTags(['RH', 'Financeiro', 'TI']);
    expect(container.querySelectorAll('.divider')).toHaveLength(2);
  });
});
