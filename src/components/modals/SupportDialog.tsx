import {Fragment} from 'react';
import {useTranslation, Trans} from 'react-i18next';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import {BaseDialog} from 'components/modals/BaseDialog';
import {DialogSection} from 'components/modals/DialogSection';

export function SupportDialog({
  handleDismiss,
  isOpen,
}: {
  handleDismiss: () => void;
  isOpen: boolean;
}): JSX.Element {
  return (
    <BaseDialog
      handleDismiss={handleDismiss}
      isOpen={isOpen}
      dialogTitleKey="content.support_title"
    >
      <SupportDialogSections />
    </BaseDialog>
  );
}

function SupportDialogSections(): JSX.Element {
  const {t} = useTranslation();

  const appAuthorEmail = process.env.REACT_APP_AUTHOR_EMAIL;
  const appAuthorGithubSponsorsUrl = process.env.REACT_APP_AUTHOR_GITHUB_SPONSORS_URL;
  const appAuthorPatreonUrl = process.env.REACT_APP_AUTHOR_PATREON_URL;
  const appAuthorPaypalUrl = process.env.REACT_APP_AUTHOR_PAYPAL_URL;

  return (
    <Fragment>
      <DialogSection>
        <h3>
          <EmojiFoodBeverageIcon fontSize="inherit" />
          {t('content.support_section_author.title')}
        </h3>
        <div>
          <Trans
            i18nKey="content.support_section_author.sponsors"
            components={[
              <a href={appAuthorPatreonUrl} rel="noopener noreferrer" target="_blank">text</a>,
              <a href={appAuthorGithubSponsorsUrl} rel="noopener noreferrer" target="_blank">text</a>
            ]}
          />
        </div>
        <div>
          <Trans
            i18nKey="content.support_section_author.one_off_links"
            components={[
              <a href={appAuthorPaypalUrl} rel="noopener noreferrer" target="_blank">text</a>,
              <a href={`mailto:${appAuthorEmail}`} rel="noopener noreferrer" target="_blank">text</a>
            ]}
          />
        </div>
      </DialogSection>
      <DialogSection>
        <h3>
          {t('content.support_section_others.title')}
        </h3>
        <div>
          <Trans
            i18nKey="content.support_section_others.eff"
            components={[
              <a href="https://supporters.eff.org/donate" rel="noopener noreferrer" target="_blank">text</a>
            ]}
          />
        </div>
      </DialogSection>
    </Fragment>
  );
}
