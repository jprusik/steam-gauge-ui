import styled from "@emotion/styled";
import { PageContent } from "components/PageContent";

export const LoadingRedirectPage = (): JSX.Element => (
  <PageContent>
    <ContentContainer>
      <p>Redirecting to Steam's login page...</p>
    </ContentContainer>
  </PageContent>
);

const ContentContainer = styled.div`
  margin: 2em auto;
  text-align: left;
`;
