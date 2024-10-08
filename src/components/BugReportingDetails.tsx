import styled from "@emotion/styled";

export const BugReportingDetails = (): JSX.Element => (
  <div>
    <BugReportingDetailsIntro>
      Notice an issue? Is a value wrong? Send the details along at the
      appropriate link below.
    </BugReportingDetailsIntro>
    <hr />
    <p>
      <strong>Database issues (wrong values, missing information, etc):</strong>
      <br />
      <a
        href={process.env.REACT_APP_ISSUE_TRACKER_DB}
        target="_blank"
        rel="noopener noreferrer"
      >
        Steam Gauge DB Issue Tracker
      </a>
    </p>
    <p>
      <strong>General issues:</strong>
      <br />
      <a
        href={process.env.REACT_APP_ISSUE_TRACKER}
        target="_blank"
        rel="noopener noreferrer"
      >
        Steam Gauge App Issue Tracker
      </a>
    </p>
  </div>
);

const BugReportingDetailsIntro = styled.p`
  margin: 0px auto;
  font-size: 0.75em;
  font-style: italic;
`;
