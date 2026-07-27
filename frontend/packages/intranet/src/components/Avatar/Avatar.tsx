/**
 * Avatar component.
 * @module components/theme/Avatar/Avatar
 */
import Image from '@plone/volto/components/theme/Image/Image';
import { getInitials } from '@plone/volto/helpers/Utils/Utils';

const defaultSize = 30;
const defaultColor = 'Teal';
const defaultClassName = 'avatar circular';

type AvatarProps = {
  src?: string | null;
  title?: string | null;
  text?: string | null;
  size?: number;
  color?: string;
  className?: string;
};

const Avatar = ({
  src = null,
  title = null,
  text = null,
  size = defaultSize,
  color = defaultColor,
  className = defaultClassName,
}: AvatarProps) => {
  const radius = Math.round(size / 2);
  return (
    <div className={className} title={title}>
      {src ? (
        <Image src={`/++api++${src}`} alt={title} />
      ) : (
        <svg width={size} height={size}>
          <circle cx={radius} cy={radius} r={radius} fill={color} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="white"
            fontSize={`${radius}px`}
            fontFamily="Arial"
            dy=".3em"
          >
            {text || getInitials(title, 1)}
          </text>
        </svg>
      )}
    </div>
  );
};

export default Avatar;
