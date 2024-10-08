import { Switch, Route } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { AboutPage } from "components/pages/About";
import AccountPage from "components/pages/Account";
import FriendsPage from "components/pages/Friends";
import { LoadingRedirectPage } from "components/pages/LoadingRedirect";
import { Home } from "components/pages/Home";
import { PrivacyPage } from "components/pages/Privacy";
import { ReceiptPage } from "components/pages/Receipt";
import "./Body.scss";

const urlRedirect = (url) => {
  window.location = url;

  return <LoadingRedirectPage />;
};

const RouteWithComponentProps = ({
  component: Component,
  componentProps,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={() => <Component {...{ ...routeProps, ...componentProps }} />}
  />
);

const loginUrl = process.env.REACT_APP_OPEN_ID_URL;

// Note: order of the routes matters!
export const Body = ({ checkLoginError = false, setUser, user }) => (
  <StyledBody
    className="container"
    style={{ marginBottom: "140px" }}
    role="main"
  >
    {checkLoginError && (
      <div
        className="alert alert-danger"
        style={{ maxWidth: "66vw", margin: "0 auto 20px auto" }}
        role="alert"
      >
        Are you connected to the internet? There was an issue connecting to the
        Steam Gauge server. Some features may not operate correctly.
      </div>
    )}
    <Switch>
      <RouteWithComponentProps
        exact
        path="/"
        component={Home}
        componentProps={{ user, setUser }}
      />
      <Route path="/account/:id" component={AccountPage} />
      <RouteWithComponentProps
        path="/friends/:id"
        component={FriendsPage}
        componentProps={{ user }}
      />
      <RouteWithComponentProps
        path="/friends"
        component={Home}
        componentProps={{ isFriends: true, user, setUser }}
      />
      <Route path="/about" component={AboutPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/receipt" component={ReceiptPage} />
      <Route path="/login" render={() => urlRedirect(loginUrl)} />
    </Switch>
  </StyledBody>
);

const StyledBody = styled.div`
  a {
    color: #337ab7;

    :hover,
    :active,
    :focus-visible {
      color: #a0cbf5;

      .favoriteIcon {
        color: #db61a2;
      }
    }
  }
`;
