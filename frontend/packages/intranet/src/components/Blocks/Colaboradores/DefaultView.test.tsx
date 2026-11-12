import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import type { BlockViewProps } from '@plone/types';
import ColaboradoresView from './DefaultView';

vi.mock('../../Summary/ColaboradorSummary', () => ({
  default: ({ content }: { content: { title: string } }) => (
    <div className="colaborador">{content.title}</div>
  ),
}));

const renderView = (props: Partial<BlockViewProps>) =>
  render(
    <ColaboradoresView
      {...({
        className: '',
        data: { '@type': 'colaboradoresBlock' },
        content: { colaboradores: [{ title: 'Maria' }] },
        ...props,
      } as unknown as BlockViewProps)}
    />,
  );

describe('ColaboradoresView', () => {
  it('mostra o título gravado no bloco como cabeçalho', () => {
    const { container } = renderView({
      data: { '@type': 'colaboradoresBlock', title: 'Nossa equipe' },
    });
    expect(container.querySelector('h2.headline')?.textContent).toBe(
      'Nossa equipe',
    );
  });

  it('usa Colaboradores quando o bloco não tem título', () => {
    const { container } = renderView({});
    expect(container.querySelector('h2.headline')?.textContent).toBe(
      'Colaboradores',
    );
  });
});
