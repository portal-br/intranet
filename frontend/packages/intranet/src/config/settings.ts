import type { ConfigType } from '@plone/registry';
// VLibras
import Libras from '@plonegovbr/volto-vlibras/components/Libras';

// Bookmarks
import Bookmarking from '../components/Bookmarking/Bookmarking';

export default function install(config: ConfigType) {
  // Idioma em português
  config.settings.isMultilingual = false;
  config.settings.defaultLanguage = 'pt-br';
  // Additional language settings for Volto 19 and above, add as many supported languages as needed
  // Languages not added to supportedLanguages will not be included in the build
  config.settings.supportedLanguages = ['pt-br'];

  config.settings.contextualVocabularies = [
    'portalbrasil.intranet.voc.gestores',
  ];

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

  return config;
}
