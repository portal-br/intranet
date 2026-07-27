import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import GestorBlockData from './Data';
import GestorBlockView from './View';
import type { BlockEditProps } from '@plone/types';

const GestorBlockEdit = (props: BlockEditProps) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <GestorBlockView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <GestorBlockData
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(GestorBlockEdit);
