import { beforeEach, describe, expect, it } from 'vitest';
import type { ConfigType } from '@plone/registry';
import applyConfig from '../index';
import installBlocks from './blocks';
import installSettings from './settings';
import installViews from './views';
import AreaView from '../components/Views/AreaView';
import ColaboradorView from '../components/Views/ColaboradorView';
import ServicoView from '../components/Views/ServicoView';
import Bookmarking from '../components/Bookmarking/Bookmarking';
import ProfilesTemplate from '../components/Blocks/Listing/ProfilesGridTemplate';

const ExistingExtra = () => null;
const ExistingView = () => null;
const schemaForm = { id: 'schemaForm', title: 'Formulário' };

// Configuração mínima, com o que o add-on lê antes de alterar.
function baseConfig(): ConfigType {
  return {
    settings: {
      appExtras: [{ match: '/existing', component: ExistingExtra }],
    },
    blocks: {
      groupBlocksOrder: [{ id: 'common', title: 'Common' }],
      blocksConfig: {
        listing: { variations: [{ id: 'default', title: 'Default' }] },
        schemaForm,
      },
      initialBlocks: { Event: ['title'] },
    },
    views: {
      contentTypesViews: { Event: ExistingView },
    },
  } as unknown as ConfigType;
}

describe('installSettings', () => {
  let config: ConfigType;

  beforeEach(() => {
    config = installSettings(baseConfig());
  });

  it('configura o site somente em português do Brasil', () => {
    expect(config.settings.isMultilingual).toBe(false);
    expect(config.settings.defaultLanguage).toBe('pt-br');
    expect(config.settings.supportedLanguages).toEqual(['pt-br']);
  });

  it('declara o vocabulário contextual de gestores', () => {
    expect(config.settings.contextualVocabularies).toEqual([
      'portalbrasil.intranet.voc.gestores',
    ]);
  });

  it('mantém os appExtras existentes e adiciona VLibras e favoritos', () => {
    const extras = config.settings.appExtras;
    expect(extras).toHaveLength(3);
    expect(extras[0].component).toBe(ExistingExtra);
    expect(extras[1].match).toBe('');
    expect(extras[2]).toEqual({
      match: '/',
      component: Bookmarking,
      props: {},
    });
  });
});

describe('installBlocks', () => {
  let config: ConfigType;

  beforeEach(() => {
    config = installBlocks(baseConfig());
  });

  it('adiciona o grupo Intranet ao final da ordem de grupos', () => {
    expect(config.blocks.groupBlocksOrder).toEqual([
      { id: 'common', title: 'Common' },
      { id: 'intranet', title: 'Intranet' },
    ]);
  });

  it('adiciona a variação Perfis ao bloco de listagem', () => {
    const variations = config.blocks.blocksConfig.listing.variations;
    expect(variations.map((v: { id: string }) => v.id)).toEqual([
      'default',
      'profiles',
    ]);
    expect(variations[1].template).toBe(ProfilesTemplate);
  });

  describe.each([
    ['areasBlock', 'Áreas'],
    ['colaboradoresBlock', 'Equipe'],
    ['gestorBlock', 'Gestor'],
  ])('%s', (id, title) => {
    it('é registrado no grupo Intranet', () => {
      const block = config.blocks.blocksConfig[id];
      expect(block.id).toBe(id);
      expect(block.title).toBe(title);
      expect(block.group).toBe('intranet');
      expect(block.view).toBeTruthy();
      expect(block.edit).toBeTruthy();
      expect(typeof block.blockSchema).toBe('function');
    });

    it('fica disponível apenas em conteúdos do tipo Area', () => {
      const { restricted } = config.blocks.blocksConfig[id];
      expect(restricted({ contentType: 'Area' })).toBe(false);
      expect(restricted({ contentType: 'Document' })).toBe(true);
    });
  });

  it('define os blocos iniciais e preserva os existentes', () => {
    expect(config.blocks.initialBlocks).toEqual({
      Event: ['title'],
      Area: [
        'title',
        'description',
        'areasBlock',
        'gestorBlock',
        'colaboradoresBlock',
      ],
      Document: ['title', 'description'],
      'News Item': ['title', 'description', 'leadimage'],
    });
  });

  it('expõe o schemaForm também como bloco form', () => {
    expect(config.blocks.blocksConfig.form).toBe(schemaForm);
  });
});

describe('installViews', () => {
  it('registra as views dos tipos da intranet e preserva as existentes', () => {
    const config = installViews(baseConfig());
    expect(config.views.contentTypesViews).toEqual({
      Event: ExistingView,
      Area: AreaView,
      Colaborador: ColaboradorView,
      Servico: ServicoView,
    });
  });
});

describe('applyConfig', () => {
  it('aplica settings, blocos e views na mesma configuração', () => {
    const config = baseConfig();
    const result = applyConfig(config);

    expect(result).toBe(config);
    expect(result.settings.defaultLanguage).toBe('pt-br');
    expect(result.blocks.blocksConfig.areasBlock).toBeDefined();
    expect(result.views.contentTypesViews.Area).toBe(AreaView);
  });
});
