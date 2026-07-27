import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import ColaboradoresView from './DefaultView';
import type { BlockViewProps } from '@plone/types';

const ColaboradoresBlockView = (props: BlockViewProps) => {
  return <ColaboradoresView {...props} />;
};

export default withBlockExtensions(ColaboradoresBlockView);
