import Icon from '@plone/volto/components/theme/Icon/Icon';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { Card } from 'semantic-ui-react';
import houseSVG from '@plone/volto/icons/home.svg';
import type { Area } from '../../types';

type AreaSummaryProps = {
  content: Area;
  isEditMode?: boolean;
};

const LinkWrapper = ({ children, className, condition, item }: any) => {
  return (
    <ConditionalLink condition={condition} item={item} className={className}>
      {!condition ? <div className={className}>{children}</div> : children}
    </ConditionalLink>
  );
};

const AreaSummary = ({ content, isEditMode }: AreaSummaryProps) => {
  return (
    <Card
      key={content.UID}
      className={'area'}
      as={LinkWrapper}
      condition={!isEditMode}
      item={content}
    >
      <Icon name={houseSVG} size="64px" className={'icon listitem'} />
      <Card.Content>
        <Card.Header>
          <div className={'nome'}>{content.title}</div>
        </Card.Header>
        <Card.Meta>{content.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default AreaSummary;
