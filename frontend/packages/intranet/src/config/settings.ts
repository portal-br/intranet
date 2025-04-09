import type { ConfigType } from '@plone/registry';

// VLibras
import Libras from '@plonegovbr/volto-vlibras/components/Libras';

// Bookmarks
import Bookmarking from '../components/Bookmarking/Bookmarking';

export default function install(config: ConfigType) {
  // Idioma em português
  config.settings.isMultilingual = false;
  config.settings.defaultLanguage = 'pt-br';
  config.settings.supportedLanguages = ['pt-br'];
  // Vocabularios
  config.settings.contextualVocabularies = [
    'portalbrasil.intranet.voc.gestores',
  ];
  // Intranet
  config.settings.intranet = {
    acessibilidade: {
      enable_contraste: false,
      enable_fonte: true,
      enable_link: false,
    },
  };

  // Habilita VLibras
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: Libras,
      props: {},
    },
    {
      match: '/',
      component: Bookmarking,
      props: {},
    },
  ];

  // Expanders
  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: {
        'expand.inherit.behaviors':
          'portalbrasil.header,portalbrasil.footer,portalbrasil.social_networks',
      },
    },
  ];

  return config;
}
