import { Card } from 'semantic-ui-react';
import ColaboradorSummary from '../../Summary/ColaboradorSummary';
import type { BlockViewProps } from '@plone/types';
import type { Area } from '../../../types';

const Header = ({ title }: { title?: string }) => {
  return <h2 className={'headline'}>{title}</h2>;
};

const ColaboradoresView = (props: BlockViewProps & { title?: string }) => {
  const { className, title = 'Colaboradores', content, isEditMode } = props;
  const { colaboradores } = content as Area;
  const items = colaboradores;
  return (
    <div className={`block colaboradores ${className}`}>
      {isEditMode && !(items && items.length > 0) && <Header title={title} />}
      {items && items.length > 0 && (
        <>
          <Header title={title} />
          <Card.Group className={'colaboradores'}>
            {items.map(function (colaborador, i) {
              return <ColaboradorSummary content={colaborador} key={i} />;
            })}
          </Card.Group>
        </>
      )}
    </div>
  );
};

export default ColaboradoresView;
