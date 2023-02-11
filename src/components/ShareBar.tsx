import styled from '@emotion/styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

type ShareBarProps = {
  message: string;
  url: string;
}

enum SocialNetwork {
  TWITTER = 'twitter',
  FACEBOOK = 'facebook'
}

export function ShareBar ({
  message,
  url
}: ShareBarProps): JSX.Element {
  const encodedShareMessage = encodeURIComponent(message);
  const encodedShareUrl = encodeURIComponent(url);

  return (
    <ShareIconsContainer>
      Share:
      <ShareLink
        href={`https://twitter.com/share?url=${encodedShareUrl}&text=${encodedShareMessage}`}
        rel="noopener noreferrer"
        socialNetwork={SocialNetwork.TWITTER}
        target="_blank"
      >
        <TwitterIcon />
      </ShareLink>
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
        rel="noopener noreferrer"
        socialNetwork={SocialNetwork.FACEBOOK}
        target="_blank"
      >
        <FacebookIcon />
      </ShareLink>
    </ShareIconsContainer>
  );
}

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

const ShareLink = styled.a<{socialNetwork: SocialNetwork}>`
  display: inline-block;
  margin: 0 5px;
  border: 0px solid #ccc;
  text-decoration: none;

  color: ${({socialNetwork}) =>
    socialNetwork === SocialNetwork.FACEBOOK ? '#3b5998' :
      socialNetwork === SocialNetwork.TWITTER ? '#0094c2' : '#8bb9e0'
}!important; // !important bootstrap override

  > svg {
    font-size: 2.5rem;
  }
`;
