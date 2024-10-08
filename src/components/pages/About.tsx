import styled from "@emotion/styled";
import { PageContent } from "components/PageContent";

export const AboutPage = (): JSX.Element => (
  <PageContent>
    <ContentContainer>
      <PageTitle>About the App</PageTitle>
      <p>
        {process.env.REACT_APP_NAME} is a{" "}
        <a href="https://www.python.org">Python-based</a> web app driven by{" "}
        <a href="http://flask.pocoo.org">Flask</a>. It has undergone several
        revisions, including a migration from Python 2 to 3. It makes use of
        Steam's Web API, Big Picture API, and several custom Python scripts that
        scrape data from the Steam Store pages (if necessary). That metadata is
        stored in a database for easy retrieval by the{" "}
        {process.env.REACT_APP_NAME} app. {process.env.REACT_APP_NAME} does not
        currently store any information about your account (your login id is
        stored in your browser as a cookie). The app code is available for
        review at{" "}
        <a href="https://github.com/jprusik/steam-gauge">
          https://github.com/jprusik/steam-gauge
        </a>
      </p>
      <br />
      <PageTitle>About Me</PageTitle>
      <p>
        My name is {process.env.REACT_APP_AUTHOR_NAME}, and I'm a Boston-based
        Full Stack web engineer who specializes in Python, SQL, and JavaScript.
        My work has been featured on{" "}
        <a
          href="https://techcrunch.com/2013/04/01/steam-gauge-gauges-the-sizeprice-of-your-steam"
          rel="noopener noreferrer"
        >
          TechCrunch
        </a>{" "}
        and the front page of{" "}
        <a href="https://news.ycombinator.com/item?id=5472548" rel="nofollow">
          Hacker News
        </a>
        . I like building things that people will use and find useful.{" "}
        <a href={process.env.REACT_APP_DOMAIN_URL}>
          {process.env.REACT_APP_PRETTY_DOMAIN_URL}
        </a>{" "}
        is my first Python web app.
      </p>
      <p>
        I can be contacted via{" "}
        <a
          href={process.env.REACT_APP_AUTHOR_SOCIAL_PROFILE_TWITTER}
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        ,{" "}
        <a
          href={process.env.REACT_APP_AUTHOR_SOCIAL_PROFILE_LINKEDIN}
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        , and{" "}
        <a href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}>e-mail</a>. Of
        course, I do occasionally sneak in a game of Civilization on{" "}
        <a
          href={process.env.REACT_APP_AUTHOR_SOCIAL_PROFILE_STEAM}
          rel="noopener noreferrer"
        >
          Steam
        </a>{" "}
        as well.
      </p>
    </ContentContainer>
  </PageContent>
);

const PageTitle = styled.h2`
  text-shadow: #3d3d3d 1px 1px 1px;
  color: #eeeeee;
`;

const ContentContainer = styled.div`
  margin: 2em auto;
  text-align: left;
`;
