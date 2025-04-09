import type { ConfigType } from '@plone/registry';
// Reducers
import { acessibilidade } from '../reducers/acessibilidade';

export default function install(config: ConfigType) {
  config.addonReducers = {
    ...config.addonReducers,
    acessibilidade,
  };

  return config;
}
