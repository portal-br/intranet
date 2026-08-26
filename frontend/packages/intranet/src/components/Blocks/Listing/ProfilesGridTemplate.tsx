import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import type { Image as PloneImage } from '@plone/types';
import ColaboradorSummary from '../../Summary/ColaboradorSummary';

type ProfileItem = {
  '@id': string;
  title?: string;
  description?: string;
  image_scales?: Record<string, PloneImage[]> | null;
};

type ProfilesTemplateProps = {
  items: ProfileItem[];
  linkTitle?: string;
  linkHref?: { '@id': string }[];
  isEditMode?: boolean;
};

const ProfilesTemplate = ({
  items,
  linkTitle,
  linkHref,
  isEditMode,
}: ProfilesTemplateProps) => {
  let link = null;
  const href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  return (
    <>
      <div className="items profiles">
        {items.map((item) => {
          return (
            <div className="listing-person" key={item['@id']}>
              <ColaboradorSummary
                content={item as any}
                isEditMode={isEditMode}
              />
            </div>
          );
        })}
      </div>
      {link && <div className="footer">{link}</div>}
    </>
  );
};

export default ProfilesTemplate;
