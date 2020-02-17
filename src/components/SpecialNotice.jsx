import React from 'react';

const SpecialNoticeStyles = {
  clear: 'both',
  color: '#61892b',
  fontSize: '0.75em',
  fontWeight: 'bold',
  paddingTop: '5px',
  textAlign: 'center'
};

const SpecialNotice = () =>
  <p style={SpecialNoticeStyles}>Note: Your Steam profile must be <a style={{textDecoration: 'underline', color: '#84bc3c'}}href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401" target="_blank" rel="noopener noreferrer">publicly viewable</a> for this tool to work!</p>

export default  SpecialNotice;
