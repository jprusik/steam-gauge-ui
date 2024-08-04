import { Fragment } from "react";
import { LinkType } from "types";

type AccountLinkProps = {
  accountID: string;
  linkType: LinkType;
};

export const AccountLink = ({
  accountID,
  linkType = LinkType.ACCOUNT,
}: AccountLinkProps): JSX.Element => (
  <Fragment>
    <p>Your Steam account ID (click to visit your {linkType} page):</p>
    <a href={`/${linkType}/${accountID}`} className="open-modal">
      {accountID}
    </a>
  </Fragment>
);
