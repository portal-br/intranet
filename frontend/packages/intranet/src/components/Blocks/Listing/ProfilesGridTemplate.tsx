import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import Image from '@plone/volto/components/theme/Image/Image';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import type { Image as PloneImage } from '@plone/types';

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
          const ItemBodyTemplate = () => {
            const image = item?.image_scales?.image;
            const image_url = image
              ? `${item['@id']}/${image[0].scales.mini?.download}`
              : null;
            return (
              <div className="card-container person">
                <div className="person-image-wrapper">
                  {image_url ? (
                    <Image src={image_url} alt="" className="person-image" />
                  ) : (
                    <Image
                      src={DefaultImageSVG}
                      alt=""
                      className="person-image"
                    />
                  )}
                </div>
                <div className="item">
                  <div className="content">
                    <h3 className="person-name">{item?.title}</h3>
                    <div className="person-description">
                      {item.description && item.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          };
          return (
            <div className="listing-person" key={item['@id']}>
              <ConditionalLink item={item} condition={!isEditMode}>
                <ItemBodyTemplate />
              </ConditionalLink>
            </div>
          );
        })}
      </div>
      {link && <div className="footer">{link}</div>}
    </>
  );
};

export default ProfilesTemplate;
