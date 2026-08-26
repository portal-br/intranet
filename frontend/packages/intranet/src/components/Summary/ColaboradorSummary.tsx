import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { Card } from 'semantic-ui-react';
import personSVG from '@plone/volto/icons/user.svg';
import type { Colaborador } from '../../types';

type ColaboradorSummaryProps = {
  content: Colaborador;
  isEditMode?: boolean;
};

const LinkWrapper = ({ children, className, condition, item }: any) => {
  return (
    <ConditionalLink condition={condition} item={item} className={className}>
      {!condition ? <div className={className}>{children}</div> : children}
    </ConditionalLink>
  );
};

const ColaboradorSummary = ({
  content,
  isEditMode,
}: ColaboradorSummaryProps) => {
  const img = content.image_scales?.image;
  const scale = img ? img[0]?.scales?.tile : null;
  return (
    <Card
      key={content.UID}
      className={'colaborador'}
      as={LinkWrapper}
      condition={!isEditMode}
      item={content}
    >
      {img ? (
        <Image
          src={`${content['@id']}/${scale?.download}`}
          alt={`Foto de ${content.title}`}
          className={'portrait listitem'}
        />
      ) : (
        <Icon name={personSVG} size="64px" className={'portrait listitem'} />
      )}
      <Card.Content>
        <Card.Header>
          <div className={'nome'}>{content.title}</div>
        </Card.Header>
        <Card.Meta>{content.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ColaboradorSummary;
