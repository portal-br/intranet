import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import GestorView from './DefaultView';
import type { BlockViewProps } from '@plone/types';

const GestorBlockView = (props: BlockViewProps) => {
  return <GestorView {...props} />;
};

export default withBlockExtensions(GestorBlockView);
