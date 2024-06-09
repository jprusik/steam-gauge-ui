import styled from '@emotion/styled';

export const SpecialNotice = (): JSX.Element => (
  <SpecialNoticeText>
    Note: Your Steam account profile and apps must be{' '}
    <a
      href="https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276"
      target="_blank"
      rel="noopener noreferrer">
      publicly viewable
    </a>{' '}
    for this tool to work!
  </SpecialNoticeText>
);

const SpecialNoticeText = styled.p`
  clear: both;
  padding-top: 5px;
  text-align: center;
  color: #61892b;
  font-size: 0.75em;
  font-weight: bold;

  > a {
    text-decoration: none;
    color: #84bc3c;

    :hover,
    :active,
    :focus-visible {
      color: #84bc3c;
      text-decoration: underline;
    }
  }
`;
