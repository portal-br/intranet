import Icon from '@plone/volto/components/theme/Icon/Icon';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { Card } from 'semantic-ui-react';
import houseSVG from '@plone/volto/icons/home.svg';
import type { Area } from '../../types';

type AreaSummaryProps = {
  content: Area;
};

const AreaSummary = ({ content }: AreaSummaryProps) => {
  return (
    <Card key={content.UID} className={'area'}>
      <Icon name={houseSVG} size="64px" className={'icon listitem'} />
      <Card.Content>
        <Card.Header>
          <UniversalLink href={content['@id']} className={'nome'}>
            {content.title}
          </UniversalLink>
        </Card.Header>
        <Card.Meta>{content.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default AreaSummary;
