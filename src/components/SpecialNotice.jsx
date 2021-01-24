import styled from '@emotion/styled';

export const SpecialNotice = () => (
  <SpecialNoticeText>
    Note: Your Steam account profile and apps must be <a href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401" target="_blank" rel="noopener noreferrer">publicly viewable</a> for this tool to work!
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
    text-decoration: underline;
    color: #84bc3c;
  }
`;
