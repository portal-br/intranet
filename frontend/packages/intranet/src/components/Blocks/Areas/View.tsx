import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import AreasView from './DefaultView';
import type { BlockViewProps } from '@plone/types';

const AreasBlockView = (props: BlockViewProps) => {
  return <AreasView {...props} />;
};

export default withBlockExtensions(AreasBlockView);
