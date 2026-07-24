// SemanticUI-free pre-@plone/components
import { defineMessages, useIntl } from 'react-intl';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import Image from '@plone/volto/components/theme/Image/Image';
import LogoImage from './logo.svg';

const messages = defineMessages({
  tool: {
    id: 'Portal Brasil: Intranet',
    defaultMessage: 'Portal Brasil: Intranet',
  },
});

const ToolLogo = () => {
  const intl = useIntl();
  return (
    <UniversalLink
      href="https://plone.org.br/portal-brasil"
      title={intl.formatMessage(messages.tool)}
    >
      <Image
        src={LogoImage}
        alt={intl.formatMessage(messages.tool)}
        title={intl.formatMessage(messages.tool)}
      />
    </UniversalLink>
  );
};

export default ToolLogo;
