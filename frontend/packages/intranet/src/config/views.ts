import type { ConfigType } from '@plone/registry';
// Views
import AreaView from '../components/Views/AreaView';
import ColaboradorView from '../components/Views/ColaboradorView';
import ServicoView from '../components/Views/ServicoView';

export default function install(config: ConfigType) {
  /// Content Types
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    Area: AreaView,
    Colaborador: ColaboradorView,
    Servico: ServicoView,
  };

  return config;
}
