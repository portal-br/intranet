import { defineMessages } from 'react-intl';
import type { BlockSchemaArgs, JSONSchema } from '@plone/types';

const messages = defineMessages({
  areas: {
    id: 'Áreas',
    defaultMessage: 'Áreas',
  },
  title: {
    id: 'Título',
    defaultMessage: 'Título',
  },
});

export const areasSchema = ({ intl }: BlockSchemaArgs = {}): JSONSchema => {
  return {
    title: intl.formatMessage(messages.areas),
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
        default: 'Áreas',
      },
    },
    required: ['title'],
  };
};
