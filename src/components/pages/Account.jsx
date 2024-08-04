import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchAppDetails,
} from "actions";
import { AppsDetails } from "components/AppsTable/AppsDetails";
import { SectionLoader } from "components/Loader";
import { AccountDetails } from "components/AccountDetails";
import { LibrarySummary } from "components/LibrarySummary";
import { SearchForm } from "components/SearchForm";
import { errorMessage } from "constants/messages";

const controller = new AbortController();
const signal = controller.signal;

function abortRequests() {
  controller.abort();
}

const getAppsWithDetails = async (apps, searchedUserId) => {
  const {
    data: extraDataApps = [],
    meta: { success: appsDataSuccess, message_key: appsDataMessageKey } = {},
  } = (await fetchAccountApps(searchedUserId, true)) || {};

  if (appsDataSuccess) {
    apps.map((app) => {
      const appExtraData = extraDataApps.find(
        // map Steam passthrough records <appid: number> to stored DB records <app_id: string>
        ({ app_id }) => app_id === `${app.appid}`,
      );

      return {
        ...app,
        ...appExtraData,
      };
    });
  }

  return apps;
};

const AccountPage = () => {
  const { id: searchedUserId } = useParams();
  const [accountDetails, setUserAccountDetails] = useState();
  const [accountApps, setAccountApps] = useState([]);
  const [accountDetailsError, setAccountDetailsError] = useState(false);
  const [accountAppsErrors, setAccountAppsErrors] = useState([]);
  const [accountAppsDetailsLoading, setAccountAppsDetailsLoading] =
    useState(false);

  useEffect(() => {
    async function getAccountData() {
      const {
        data: [accountData] = [],
        meta: {
          success: accountDataSuccess,
          message_key: accountDataMessageKey,
        },
      } = (await fetchAccountDetails(searchedUserId)) || { data: [] };

      if (accountDataSuccess) {
        setUserAccountDetails(accountData);
      } else {
        setAccountDetailsError(
          accountDataMessageKey || "FETCH_ACCOUNT_DETAILS_FAILED",
        );
      }

      const {
        data: accountApps = [],
        meta: {
          success: appsDataSuccess,
          message_key: appsDataMessageKey,
        } = {},
      } = (await fetchAccountApps(searchedUserId)) || {};

      if (appsDataSuccess) {
        setAccountApps(accountApps);

        setAccountAppsDetailsLoading(true);

        // Get apps extended details
        const appsWithDetails = await getAppsWithDetails(
          accountApps,
          searchedUserId,
        );
        setAccountApps(appsWithDetails);

        setAccountAppsDetailsLoading(false);
      } else {
        setAccountAppsErrors([
          appsDataMessageKey || "FETCH_ACCOUNT_APPS_FAILED",
        ]);
      }
    }

    searchedUserId && getAccountData();

    return () => getAccountData();
  }, [searchedUserId]);

  function resetPageData() {
    // async requests need to be cancelled before unmounting components
    abortRequests();
    setUserAccountDetails(null);
    setAccountApps([]);
    setAccountDetailsError(false);
    setAccountAppsErrors([]);
  }

  return (
    <Fragment>
      <div className="container">
        <SearchForm
          {...{
            searchType: "account",
            onSearchSuccess: resetPageData,
            ...(!!searchedUserId && { hideLabel: true }),
          }}
        />
        <br />
        <div className="jumbotron">
          {accountDetails ? (
            <AccountDetails accountData={accountDetails} />
          ) : accountDetailsError ? (
            <div>
              There was a problem fetching your account information from Steam.
              If this problem persists, check{" "}
              <a
                href="https://steamcommunity.com/my/edit/settings"
                rel="noopener noreferrer"
              >
                your Steam privacy settings
              </a>{" "}
              and ensure the "My profile" setting is set to "Public".
            </div>
          ) : (
            <SectionLoader />
          )}
        </div>
        {accountDetails && accountApps.length > 0 ? (
          <LibrarySummary
            accountData={accountDetails}
            detailsLoading={accountAppsDetailsLoading}
            libraryApps={accountApps}
          />
        ) : accountAppsErrors.length ? (
          <Fragment>
            {accountAppsErrors.map((errorKey) => (
              <div key={errorKey}>
                <strong>{errorMessage[errorKey]}</strong>
              </div>
            ))}
            <div>
              If this problem persists, make sure the "Game details" setting on{" "}
              <a
                href="https://steamcommunity.com/my/edit/settings"
                rel="noopener noreferrer"
              >
                the Steam account's privacy page
              </a>{" "}
              is set to "Public".
            </div>
          </Fragment>
        ) : (
          <SectionLoader />
        )}
        {accountApps.length > 0 && !accountAppsDetailsLoading ? (
          <AppsDetails apps={accountApps} />
        ) : accountAppsErrors.length ? null : (
          <div className="jumbotron" style={{ marginTop: "20px" }}>
            <SectionLoader />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AccountPage;
