import { Card } from 'semantic-ui-react';
import ColaboradorSummary from '../../Summary/ColaboradorSummary';
import type { BlockViewProps } from '@plone/types';
import type { Area } from '../../../types';

const Header = ({ title }: { title?: string }) => {
  return <h2 className={'headline'}>{title}</h2>;
};

const GestorView = (props: BlockViewProps & { title?: string }) => {
  const { className, title = 'Gestor', content } = props;
  const { gestor } = content as Area;
  return (
    <div className={`block gestor ${className}`}>
      {gestor && (
        <>
          <Header title={title} />
          <Card.Group className={'gestor'}>
            <ColaboradorSummary content={gestor} />
          </Card.Group>
        </>
      )}
    </div>
  );
};

export default GestorView;
