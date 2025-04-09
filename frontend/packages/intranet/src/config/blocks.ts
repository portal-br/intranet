import type { ConfigType as BaseConfigType } from '@plone/registry';
import type { BlocksConfig, StyleDefinition } from '@plone/types';

// Blocks
/// Listing block variations
import ProfilesTemplate from '../components/Blocks/Listing/ProfilesGridTemplate';

/// Areas
import AreasBlockEdit from '../components/Blocks/Areas/Edit';
import AreasBlockView from '../components/Blocks/Areas/View';
import { areasSchema } from '../components/Blocks/Areas/schema';
import areasSVG from '@plone/volto/icons/home.svg';

/// Colaboradores
import ColaboradoresBlockEdit from '../components/Blocks/Colaboradores/Edit';
import ColaboradoresBlockView from '../components/Blocks/Colaboradores/View';
import { colaboradoresSchema } from '../components/Blocks/Colaboradores/schema';
import colaboradoresSVG from '@plone/volto/icons/group.svg';

/// Gestor
import GestorBlockEdit from '../components/Blocks/Gestor/Edit';
import GestorBlockView from '../components/Blocks/Gestor/View';
import { gestorSchema } from '../components/Blocks/Gestor/schema';
import gestorSVG from '@plone/volto/icons/user.svg';

declare module '@plone/types' {
  export interface BlocksConfigData {
    areasBlock: BlockConfigBase;
    colaboradoresBlock: BlockConfigBase;
    gestorBlock: BlockConfigBase;
  }
  export interface BlockConfigBase {
    themes?: StyleDefinition[];
    allowedBlocks?: string[];
    allowed_headline_tags?: string[][];
    dataAdapter?: any;
    unwantedButtons?: string[];
    imageScale?: string;
    allowed_headings?: string[][];
  }
}

export interface CustomBlocksConfig
  extends Omit<BlocksConfig, 'groupBlocksOrder'> {
  groupBlocksOrder: { id: string; title: string }[];
}
export interface ConfigType extends Omit<BaseConfigType, 'blocks'> {
  blocks: CustomBlocksConfig;
}
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
  config.blocks.blocksConfig.areasBlock = {
    id: 'areasBlock',
    title: 'Áreas',
    group: 'intranet',
    category: 'intranet',
    icon: areasSVG,
    blockSchema: areasSchema,
    view: AreasBlockView,
    edit: AreasBlockEdit,
    restricted: ({ contentType }) => contentType !== 'Area',
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  config.blocks.blocksConfig.colaboradoresBlock = {
    id: 'colaboradoresBlock',
    title: 'Equipe',
    group: 'intranet',
    category: 'intranet',
    icon: colaboradoresSVG,
    blockSchema: colaboradoresSchema,
    view: ColaboradoresBlockView,
    edit: ColaboradoresBlockEdit,
    restricted: ({ contentType }) => contentType !== 'Area',
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  config.blocks.blocksConfig.gestorBlock = {
    id: 'gestorBlock',
    title: 'Gestor',
    group: 'intranet',
    category: 'intranet',
    icon: gestorSVG,
    blockSchema: gestorSchema,
    view: GestorBlockView,
    edit: GestorBlockEdit,
    restricted: ({ contentType }) => contentType !== 'Area',
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

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

  return config;
}
