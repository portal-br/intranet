import { Card } from 'semantic-ui-react';
import AreaSummary from '../../Summary/AreaSummary';
import type { BlockViewProps } from '@plone/types';
import type { Area } from '../../../types';

const Header = ({ title }: { title?: string }) => {
  return <h2 className={'headline'}>{title}</h2>;
};

const AreasView = (props: BlockViewProps) => {
  const { className, data, content, isEditMode } = props;
  const { areas } = content as Area;
  const items = areas;
  return (
    <div className={`block areas ${className}`}>
      {isEditMode && !(items && items.length > 0) && (
        <Header title={data.title as string} />
      )}
      {items && items.length > 0 && (
        <>
          <Header title={data.title as string} />
          <Card.Group className={'subareas'}>
            {items.map(function (area, i) {
              return <AreaSummary content={area} key={i} />;
            })}
          </Card.Group>
        </>
      )}
    </div>
  );
};

export default AreasView;
