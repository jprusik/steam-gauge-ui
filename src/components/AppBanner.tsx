type AppBannerProps = {
  appid: string,
  img_logo_url: string
}

export const AppBanner = ({
  appid,
  img_logo_url
}: AppBannerProps): JSX.Element => (
  <img
    alt={`${appid} icon`}
    loading="lazy"
    src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appid}/${img_logo_url}.jpg`}
    style={{width: 184, height: 69}}
  />
);
