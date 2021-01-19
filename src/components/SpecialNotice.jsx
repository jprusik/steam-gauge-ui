/** @jsxImportSource @emotion/react */
import {css} from '@emotion/core';

const SpecialNoticeStyles = css`
  clear: both;
  color: #61892b;
  font-size: 0.75em;
  font-weight: bold;
  padding-top: 5px;
  text-align: center;
`;

const SpecialNotice = () =>
  <p css={SpecialNoticeStyles}>Note: Your Steam account profile and apps must be <a css={css`color: #84bc3c; text-decoration: underline;`} href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401" target="_blank" rel="noopener noreferrer">publicly viewable</a> for this tool to work!</p>

export default  SpecialNotice;
