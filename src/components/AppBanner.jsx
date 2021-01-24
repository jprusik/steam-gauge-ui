export const AppBanner = ({appid, img_logo_url: bannerImage}) =>
  bannerImage && (
    <img
      alt={`${appid} icon`}
      loading="lazy"
      src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appid}/${bannerImage}.jpg`}
      style={{width: 184, height: 69}}
    />
  );
