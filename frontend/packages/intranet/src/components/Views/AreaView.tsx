/**
 * AreaView view component.
 * @module components/View/AreaView
 */
import { Container } from '@plone/components';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasBlocksData } from '@plone/volto/helpers/Blocks/Blocks';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import type { Area, ContentTypeViewProps } from '../../types';

/**
 * AreaView view component.
 * @function AreaView
 * @param content Content object.
 * @returns Markup of the component.
 */
const AreaView = (props: ContentTypeViewProps<Area>) => {
  const { content, location } = props;
  const path = getBaseUrl(location?.pathname || '');

  return (
    <Container narrow className="view-wrapper area-view">
      {hasBlocksData(content) && <RenderBlocks {...props} path={path} />}
    </Container>
  );
};

export default AreaView;
