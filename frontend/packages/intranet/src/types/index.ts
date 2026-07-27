import type { Content, Image } from '@plone/types';

/** Referência resumida a um conteúdo (id, tipo e título). */
export interface ContentReference {
  '@id': string;
  '@type'?: string;
  title: string;
  description?: string;
}

/** Conteúdo do tipo Colaborador. */
export interface Colaborador extends Content {
  area_info?: ContentReference | null;
  aniversario?: string;
  email?: string;
  telefone?: string;
  image_scales?: Record<string, Image[]> | null;
}

/** Conteúdo do tipo Área. */
export interface Area extends Content {
  areas?: Area[];
  colaboradores?: Colaborador[];
  gestor?: Colaborador | null;
}

/** Conteúdo do tipo Serviço. */
export interface Servico extends Content {
  area: ContentReference;
  authentication?: boolean;
  href?: string;
  text?: { data: string };
}

/** Props comuns às views de tipo de conteúdo da intranet. */
export interface ContentTypeViewProps<T extends Content = Content> {
  content: T;
  location?: { pathname: string };
}
