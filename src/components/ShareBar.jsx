/** @jsxImportSource @emotion/react */
import {css} from '@emotion/core';

const shareContainerStyles = css`
  align-items: center;
  color: #8f98a0;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  flex: 3 1 auto;
`;

const shareLinkStyles = (socialNetwork) => css`
  border: 0px solid #ccc;
  color: ${
    socialNetwork === 'facebook' ? '#3b5998' :
    socialNetwork === 'twitter' ? '#0094c2' : '#8bb9e0'
  }!important; // !important bootstrap override
  display: inline-block;
  font-size: 2em;
  margin: 0 0.25em;
  text-decoration: none;
`;

const ShareBar = ({message, url}) => {
  const encodedShareMessage = encodeURIComponent(message);
  const encodedShareUrl = encodeURIComponent(url);

  return (
    <div css={shareContainerStyles}>
      Share:
      <a
        css={shareLinkStyles('twitter')}
        href={`https://twitter.com/share?url=${encodedShareUrl}&text=${encodedShareMessage}`}
      >
        <i className="fa fa-twitter" />
      </a>
      <a
        css={shareLinkStyles('facebook')}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
      >
        <i className="fa fa-facebook" />
      </a>
    </div>
  );
};

export default ShareBar;
