import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import type { BlockViewProps } from '@plone/types';
import GestorView from './DefaultView';

vi.mock('../../Summary/ColaboradorSummary', () => ({
  default: ({ content }: { content: { title: string } }) => (
    <div className="colaborador">{content.title}</div>
  ),
}));

const renderView = (props: Partial<BlockViewProps>) =>
  render(
    <GestorView
      {...({
        className: '',
        data: { '@type': 'gestorBlock' },
        content: { gestor: { title: 'Maria' } },
        ...props,
      } as unknown as BlockViewProps)}
    />,
  );

describe('GestorView', () => {
  it('mostra o título gravado no bloco como cabeçalho', () => {
    const { container } = renderView({
      data: { '@type': 'gestorBlock', title: 'Coordenação' },
    });
    expect(container.querySelector('h2.headline')?.textContent).toBe(
      'Coordenação',
    );
  });

  it('usa Gestor quando o bloco não tem título', () => {
    const { container } = renderView({});
    expect(container.querySelector('h2.headline')?.textContent).toBe('Gestor');
  });
});
