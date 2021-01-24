import styled from '@emotion/styled';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const ShareIconsContainer = styled.div`
  display: flex;
  flex: 3 1 auto;
  align-items: center;
  justify-content: flex-start;
  max-width: 30px
  text-align: left;
  color: #8f98a0;
  font-size: 12px;
  font-weight: bold;
`;

const ShareLink = styled.a`
  display: inline-block;
  margin: 0 5px;
  border: 0px solid #ccc;
  text-decoration: none;

  color: ${({socialNetwork}) =>
    socialNetwork === 'facebook' ? '#3b5998' :
    socialNetwork === 'twitter' ? '#0094c2' : '#8bb9e0'
  }!important; // !important bootstrap override

  > svg {
    font-size: 2.5rem;
  }
`;

const ShareBar = ({message, url}) => {
  const encodedShareMessage = encodeURIComponent(message);
  const encodedShareUrl = encodeURIComponent(url);

  return (
    <ShareIconsContainer>
      Share:
      <ShareLink
        href={`https://twitter.com/share?url=${encodedShareUrl}&text=${encodedShareMessage}`}
        rel="noopener noreferrer"
        socialNetwork="twitter"
        target="_blank"
      >
        <TwitterIcon />
      </ShareLink>
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
        rel="noopener noreferrer"
        socialNetwork="facebook"
        target="_blank"
      >
        <FacebookIcon />
      </ShareLink>
    </ShareIconsContainer>
  );
};

export default ShareBar;
