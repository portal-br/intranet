import type { BlockConfigBase } from '@plone/types';
import gestorSVG from '@plone/volto/icons/user.svg';
import GestorBlockEdit from './Edit';
import GestorBlockView from './View';
import { gestorSchema } from './schema';

export const BLOCK_ID = 'gestorBlock';

const GestorBlockInfo: BlockConfigBase = {
  id: BLOCK_ID,
  title: 'Gestor',
  icon: gestorSVG,
  group: 'intranet',
  category: 'intranet',
  view: GestorBlockView,
  edit: GestorBlockEdit,
  blockSchema: gestorSchema as unknown as BlockConfigBase['blockSchema'],
  restricted: ({ contentType }) => contentType !== 'Area',
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: false,
};

export default GestorBlockInfo;
