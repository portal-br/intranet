import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import AreasBlockData from './Data';
import AreasBlockView from './View';
import type { BlockEditProps } from '@plone/types';

const AreasBlockEdit = (props: BlockEditProps) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <AreasBlockView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <AreasBlockData
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(AreasBlockEdit);
