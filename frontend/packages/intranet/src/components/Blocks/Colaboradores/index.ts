import type { BlockConfigBase } from '@plone/types';
import colaboradoresSVG from '@plone/volto/icons/group.svg';
import ColaboradoresBlockEdit from './Edit';
import ColaboradoresBlockView from './View';
import { colaboradoresSchema } from './schema';

export const BLOCK_ID = 'colaboradoresBlock';

const ColaboradoresBlockInfo: BlockConfigBase = {
  id: BLOCK_ID,
  title: 'Equipe',
  icon: colaboradoresSVG,
  group: 'intranet',
  category: 'intranet',
  view: ColaboradoresBlockView,
  edit: ColaboradoresBlockEdit,
  blockSchema: colaboradoresSchema as unknown as BlockConfigBase['blockSchema'],
  restricted: ({ contentType }) => contentType !== 'Area',
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: false,
};

export default ColaboradoresBlockInfo;
