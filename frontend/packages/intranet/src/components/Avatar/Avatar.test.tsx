import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('mostra a inicial do título num círculo quando não há imagem', () => {
    const { container } = render(<Avatar title="Maria Silva" />);
    const circle = container.querySelector('circle');

    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('text')?.textContent).toBe('M');
    expect(circle?.getAttribute('r')).toBe('15');
    expect(circle?.getAttribute('fill')).toBe('Teal');
  });

  it('prefere o texto informado às iniciais', () => {
    const { container } = render(<Avatar title="Maria Silva" text="MS" />);
    expect(container.querySelector('text')?.textContent).toBe('MS');
  });

  it('respeita o tamanho e a cor informados', () => {
    const { container } = render(
      <Avatar title="Maria" size={64} color="Navy" />,
    );
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('width')).toBe('64');
    expect(container.querySelector('circle')?.getAttribute('r')).toBe('32');
    expect(container.querySelector('circle')?.getAttribute('fill')).toBe(
      'Navy',
    );
  });

  it('usa a imagem pela API quando há src', () => {
    // A Image do Volto lê a store Redux.
    const store = configureStore()({ intl: { locale: 'pt-br', messages: {} } });
    const { container } = render(
      <Provider store={store}>
        <Avatar title="Maria" src="/colaboradores/maria/@@images/image" />
      </Provider>,
    );
    const img = container.querySelector('img');

    expect(container.querySelector('svg')).toBeNull();
    expect(img?.getAttribute('src')).toBe(
      '/++api++/colaboradores/maria/@@images/image',
    );
    expect(img?.getAttribute('alt')).toBe('Maria');
  });

  it('aplica a classe padrão e o título no contêiner', () => {
    const { container } = render(<Avatar title="Maria" />);
    const wrapper = container.firstElementChild;

    expect(wrapper?.className).toBe('avatar circular');
    expect(wrapper?.getAttribute('title')).toBe('Maria');
  });
});
