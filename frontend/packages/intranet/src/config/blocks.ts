import type { ConfigType } from '@plone/registry';

// Blocks
/// Listing block variations
import ProfilesTemplate from '../components/Blocks/Listing/ProfilesGridTemplate';

/// Intranet blocks, each one configured in its own index.ts
import AreasBlockInfo from '../components/Blocks/Areas';
import ColaboradoresBlockInfo from '../components/Blocks/Colaboradores';
import GestorBlockInfo from '../components/Blocks/Gestor';

export default function install(config: ConfigType) {
  // Blocks
  /// Group Blocks
  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'intranet', title: 'Intranet' },
  ];

  // Listing Variations
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'profiles',
      title: 'Perfis',
      template: ProfilesTemplate,
    },
  ];

  /// New blocks
  config.blocks.blocksConfig[AreasBlockInfo.id] = AreasBlockInfo;
  config.blocks.blocksConfig[ColaboradoresBlockInfo.id] =
    ColaboradoresBlockInfo;
  config.blocks.blocksConfig[GestorBlockInfo.id] = GestorBlockInfo;

  /// Default blocks
  config.blocks.initialBlocks = {
    ...config.blocks.initialBlocks,
    Area: [
      'title',
      'description',
      'areasBlock',
      'gestorBlock',
      'colaboradoresBlock',
    ],
    Document: ['title', 'description'],
    'News Item': ['title', 'description', 'leadimage'],
  };

  /// Alias form to schemaForm for compatibility
  config.blocks.blocksConfig.form = config.blocks.blocksConfig.schemaForm;

  return config;
}
