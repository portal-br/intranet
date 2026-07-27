/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import {
  GET_VOCABULARY,
  GET_VOCABULARY_TOKEN_TITLE,
} from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { getVocabName } from '@plone/volto/helpers/Vocabularies/Vocabularies';
import config from '@plone/volto/registry';
import qs from 'query-string';

type GetVocabularyArgs = {
  vocabNameOrURL: string;
  query?: string | null;
  start?: number;
  size?: number;
  subrequest?: string;
};

type GetVocabularyTokenTitleArgs = {
  vocabNameOrURL: string;
  token?: string | null;
  tokens?: string[] | null;
  subrequest?: string;
};

/**
 * Get vocabulary given a URL (coming from a Schema) or from a vocabulary name.
 * @function getVocabulary
 * @param vocabNameOrURL Full API URL of vocabulary or vocabulary name.
 * @param query Only include results containing this string.
 * @param start Start of result batch.
 * @param size The size of the batch.
 * @param subrequest Name of the subrequest.
 * @returns Get vocabulary action.
 */
export function getVocabulary({
  vocabNameOrURL,
  query = null,
  start = 0,
  size,
  subrequest,
}: GetVocabularyArgs) {
  /* BEGIN CUSTOMIZATION */

  const vocabulary = getVocabName(vocabNameOrURL);
  let vocabPath;
  if (
    (config.settings.contextualVocabularies as string[]).includes(vocabulary)
  ) {
    vocabPath = flattenToAppURL(vocabNameOrURL);
  } else {
    vocabPath = `/@vocabularies/${vocabulary}`;
  }

  let queryString = `b_start=${start}${size ? '&b_size=' + size : ''}`;
  if (query) {
    queryString = `${queryString}&title=${query}`;
  }
  return {
    type: GET_VOCABULARY,
    vocabulary: vocabNameOrURL,
    start,
    request: {
      op: 'get',
      path: `${vocabPath}?${queryString}`,
    },
    subrequest,
  };
  /* END CUSTOMIZATION */
}

/**
 * Get the title value given a token from vocabulary given a vocabulary URL
 * (coming from a Schema) or from a vocabulary name.
 * @function getVocabularyTokenTitle
 * @param vocabNameOrURL Full API URL of vocabulary or vocabulary name.
 * @param token Only include results containing this string.
 * @returns Get vocabulary action.
 */
export function getVocabularyTokenTitle({
  vocabNameOrURL,
  token = null,
  tokens = null,
  subrequest,
}: GetVocabularyTokenTitleArgs) {
  // In case we have a URL, we have to get the vocabulary name
  const vocabulary = getVocabName(vocabNameOrURL);
  const queryString = {
    ...(token && { token }),
    ...(tokens && { tokens }),
  };

  return {
    type: GET_VOCABULARY_TOKEN_TITLE,
    vocabulary: vocabNameOrURL,
    token,
    tokens,
    subrequest,
    request: {
      op: 'get',
      path: `/@vocabularies/${vocabulary}?b_size=-1&${qs.stringify(
        queryString,
        {
          encode: false,
        },
      )}`,
    },
  };
}
