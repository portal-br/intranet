import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import ColaboradoresBlockData from './Data';
import ColaboradoresBlockView from './View';
import type { BlockEditProps } from '@plone/types';

const ColaboradoresBlockEdit = (props: BlockEditProps) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <ColaboradoresBlockView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <ColaboradoresBlockData
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(ColaboradoresBlockEdit);
