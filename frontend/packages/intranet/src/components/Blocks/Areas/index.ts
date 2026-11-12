import type { BlockConfigBase } from '@plone/types';
import areasSVG from '@plone/volto/icons/home.svg';
import AreasBlockEdit from './Edit';
import AreasBlockView from './View';
import { areasSchema } from './schema';

export const BLOCK_ID = 'areasBlock';

const AreasBlockInfo: BlockConfigBase = {
  id: BLOCK_ID,
  title: 'Áreas',
  icon: areasSVG,
  group: 'intranet',
  category: 'intranet',
  view: AreasBlockView,
  edit: AreasBlockEdit,
  blockSchema: areasSchema as unknown as BlockConfigBase['blockSchema'],
  restricted: ({ contentType }) => contentType !== 'Area',
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: false,
};

export default AreasBlockInfo;
