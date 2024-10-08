import { useState } from "react";
import { useHistory } from "react-router-dom";
import { resolveUsername } from "../actions";
import { Loader } from "./Loader";
import "./SearchForm.scss";

const isValidSteamIdFormat = (steamId) => !!steamId.match(/^\d+$/g);

export const SearchForm = ({
  searchType = "account",
  hideLabel = false,
  hideInputAddon = false,
  onSearchSuccess = () => {
    /* no-op */
  },
}) => {
  let history = useHistory();

  const [searchInput, setSearchInput] = useState("");
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  function loadNextPage(steamAccountId) {
    switch (searchType) {
      case "account":
        return history.push(`/account/${steamAccountId}`);
      case "friends":
        return history.push(`/friends/${steamAccountId}`);
      default:
        return history.push("/");
    }
  }

  async function getSteamId() {
    if (!searchInput) {
      setFormErrors(["No search value was entered."]);
      return null;
    }

    if (isValidSteamIdFormat(searchInput)) {
      // The value entered appears to already be a resolved steamid
      return searchInput;
    } else {
      const { data: { steamid: returnedId } = {}, success: steamGaugeSuccess } =
        (await resolveUsername(searchInput)) || {};

      !returnedId &&
        setFormErrors([
          !steamGaugeSuccess
            ? "Steam Gauge encountered problems attempting this search."
            : "Steam did not return any matches for the search value you entered. (ProTip: The username you use to log in to Steam is NOT the same as your public username/id)",
        ]);

      return returnedId;
    }
  }

  function handleChange({ target: { value } }) {
    setFormErrors([]);
    setSearchInput(value);
    // TODO: `getSteamId` onChange + debounce
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // TODO: display loader
    setSearchIsActive(true);

    const steamAccountId = await getSteamId();

    if (steamAccountId) {
      onSearchSuccess();
      loadNextPage(steamAccountId);
    }

    setSearchIsActive(false);
  }

  return (
    <form
      className="account-search-form"
      onSubmit={handleSubmit}
      title={`${searchType} search`}
    >
      {!hideLabel && <label htmlFor="basic-url">Your Steam profile URL:</label>}
      <div className="input-group">
        {!hideInputAddon && (
          <span className="input-group-addon steam-profile-url">
            https://steamcommunity.com/id/
          </span>
        )}
        <input
          className="form-control url-text"
          disabled={searchIsActive}
          id="basic-url"
          name="username"
          onChange={handleChange}
          placeholder="username or id"
          type="search"
          value={searchInput}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default search-submit"
            disabled={!searchInput || searchIsActive}
            type="submit"
          >
            {searchIsActive ? (
              <Loader loaderStyles="height: 20px;" />
            ) : (
              <i className="fa fa-search fa-fw"></i>
            )}
          </button>
        </span>
      </div>
      {formErrors.length > 0 && (
        <div
          style={{ marginTop: "1em" }}
          className="alert alert-danger small"
          role="alert"
        >
          {formErrors.map((error) => (
            <span className="small" key={error}>
              {error}
            </span>
          ))}
        </div>
      )}
    </form>
  );
};
