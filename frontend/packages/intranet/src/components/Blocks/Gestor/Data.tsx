import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { useIntl } from 'react-intl';
import { gestorSchema } from './schema';
import type { BlockEditProps, BlockSchemaArgs } from '@plone/types';

type GestorBlockDataProps = Pick<
  BlockEditProps,
  'data' | 'block' | 'onChangeBlock'
> &
  Partial<BlockEditProps>;

const titleBlockData = (props: GestorBlockDataProps) => {
  const { data, block, onChangeBlock, blocksConfig, navRoot, contentType } =
    props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();
  const schema = gestorSchema({ ...props, intl } as BlockSchemaArgs);
  const onChangeField = (id: string, value: unknown) => {
    onChangeBlock(block, {
      ...data,
      [id]: value,
    });
  };

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={onChangeField}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default titleBlockData;
