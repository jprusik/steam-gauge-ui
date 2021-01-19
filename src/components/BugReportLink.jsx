/** @jsxImportSource @emotion/react */
import {css} from '@emotion/core';

const bugReportLinkStyles = css`
  color: #8bb9e0;
  cursor: pointer;
  font-size: 0.75em;
  line-height: 1em;
  text-align: right;
`;

const BugReportLink = ({displayDetails, toggleDetails}) => (
  <div css={css`flex: 3 1 auto;`}>
    <div css={bugReportLinkStyles} onClick={() => toggleDetails(!displayDetails)}>
      <i className="fa fa-bug"></i>&nbsp;Something off? Report bugs!
      <span css={css`font-size: 0.75em; margin-left: 0.5em;`}>{ displayDetails ? '▲' : '▼' }</span>
    </div>
  </div>
);

export default BugReportLink;
