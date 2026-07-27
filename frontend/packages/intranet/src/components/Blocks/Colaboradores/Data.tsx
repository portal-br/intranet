import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { useIntl } from 'react-intl';
import { colaboradoresSchema } from './schema';
import type { BlockEditProps, BlockSchemaArgs } from '@plone/types';

type ColaboradoresBlockDataProps = Pick<
  BlockEditProps,
  'data' | 'block' | 'onChangeBlock'
> &
  Partial<BlockEditProps>;

const titleBlockData = (props: ColaboradoresBlockDataProps) => {
  const { data, block, onChangeBlock, blocksConfig, navRoot, contentType } =
    props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();
  const schema = colaboradoresSchema({ ...props, intl } as BlockSchemaArgs);
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
