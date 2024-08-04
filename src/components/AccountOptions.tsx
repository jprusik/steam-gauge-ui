import { Fragment } from "react";
import styled from "@emotion/styled";
import { LinkType, UserState } from "types";
import { AccountLink } from "components/AccountLink";
import { LoginLink } from "components/LoginLink";
import { LogoutLink } from "components/LogoutLink";

type AccountOptionsProps = UserState & {
  isFriends: boolean;
};

export function AccountOptions({
  isFriends,
  user,
  setUser,
}: AccountOptionsProps) {
  const { account_id: accountId } = user || {};

  return (
    <OptionsContainer>
      {!accountId ? (
        <LoginLink />
      ) : (
        <Fragment>
          <AccountLink
            accountID={accountId}
            linkType={isFriends ? LinkType.FRIENDS : LinkType.ACCOUNT}
          />
          <br />
          <LogoutLink setUser={setUser} />
        </Fragment>
      )}
    </OptionsContainer>
  );
}

const OptionsContainer = styled.div`
  display: block;
  margin: auto;
  width: 100%;
  text-align: center;
`;
