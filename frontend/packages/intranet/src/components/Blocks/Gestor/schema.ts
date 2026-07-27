import { defineMessages } from 'react-intl';
import type { BlockSchemaArgs, JSONSchema } from '@plone/types';

const messages = defineMessages({
  gestor: {
    id: 'Gestor',
    defaultMessage: 'Gestor',
  },
  title: {
    id: 'Título',
    defaultMessage: 'Título',
  },
});

export const gestorSchema = ({ intl }: BlockSchemaArgs = {}): JSONSchema => {
  return {
    title: intl.formatMessage(messages.gestor),
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
        default: 'Gestor',
      },
    },
    required: ['title'],
  };
};
