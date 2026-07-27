import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@plone/components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import tagSVG from '@plone/volto/icons/tag.svg';

type TagsProps = {
  tags?: string[] | null;
};

/**
 * Tags component.
 * @function Tags
 * @param tags Array of tags.
 * @returns Markup of the component.
 */
const Tags = ({ tags = null }: TagsProps) => {
  const parsedTags = tags ? tags.filter((tag) => tag !== 'Área') : [];
  return parsedTags.length > 0 ? (
    <Container narrow className="tags">
      <Icon name={tagSVG} />
      {parsedTags.map((tag, i) => (
        <Fragment key={tag}>
          <Link className="ui tag" to={`/search?Subject=${tag}`}>
            {tag}
          </Link>
          {parsedTags.length > i + 1 && <span className="divider">,</span>}
        </Fragment>
      ))}
    </Container>
  ) : (
    <span />
  );
};

export default Tags;
