import { defineMessages } from 'react-intl';
import type { BlockSchemaArgs, JSONSchema } from '@plone/types';

const messages = defineMessages({
  colaboradores: {
    id: 'Colaboradores',
    defaultMessage: 'Colaboradores',
  },
  title: {
    id: 'Título',
    defaultMessage: 'Título',
  },
});

export const colaboradoresSchema = ({
  intl,
}: BlockSchemaArgs = {}): JSONSchema => {
  return {
    title: intl.formatMessage(messages.colaboradores),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title'],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.title),
        default: 'Colaboradores',
      },
    },
    required: ['title'],
  };
};
