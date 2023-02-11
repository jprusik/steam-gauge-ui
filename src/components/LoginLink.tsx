import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import steamSignInButtonImage from 'assets/steam_sign_in_button.png';

export const LoginLink = () =>
  <StyledLink className="steam-login-button" to="/login" />;

const StyledLink = styled(Link)`
  display: block;
  width: 114px;
  height: 43px;
  margin: auto;
  background-image: url(${steamSignInButtonImage});
  background-repeat: no-repeat;
  background-position: 0px 0px;

  &:hover {
    background-position: 0px -43px;
  }
`;
