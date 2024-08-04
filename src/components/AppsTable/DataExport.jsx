import styled from "@emotion/styled";
import GetAppIcon from "@mui/icons-material/GetApp";
import { CSVLink } from "react-csv";
import { dataExportHeaders } from "constants/dataExportHeaders";

export function DataExport({ data }) {
  // workaround for react-csv not supporting nested selectors when a
  // parent can have a value of "null"
  const formattedData = data.map(({ time_to_beat, ...other }) => ({
    minutes_to_beat_completionist: time_to_beat?.minutes_to_beat_completionist,
    minutes_to_beat_main_game: time_to_beat?.minutes_to_beat_main_game,
    ...other,
  }));

  return (
    <LinkContainer className="btn-group">
      <CSVLink
        className="btn btn-primary btn-sm navbar-btn"
        filename={"MySteamLibraryData.csv"}
        data={formattedData}
        target="_blank"
        headers={dataExportHeaders}
      >
        <GetAppIcon />
        Download CSV
      </CSVLink>
    </LinkContainer>
  );
}

const LinkContainer = styled.div`
  > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-color: #9d9d9d;
    background-color: transparent;
    background-image: none;
    width: 120px;
    text-transform: capitalize;
    color: #9d9d9d;

    :active,
    :focus,
    :hover {
      border-color: #ffffff;
      border-color: #ffffff;
      background-color: transparent;
      color: #ffffff;
    }
  }
`;
