import Cookies from "js-cookie";

function checkResponseStatus(response) {
  const contentTypeHeader = response.headers.get("Content-Type");
  const isJSON =
    contentTypeHeader && contentTypeHeader.match(/application\/json/i);

  if (response.ok && isJSON) {
    return response;
  }

  return throwError(response);
}

function throwError(response) {
  const error = new Error(`(${response.status}) "${response.statusText}"`);
  error.status = response.statusText;
  error.response = response;

  throw error;
}

function setRequestCache(response) {
  const requestDomain = window.location.origin;
  const requestPath = response.url.replace(requestDomain, "");

  response
    .clone() // don't consume the original promise resolution
    .json()
    .then((data) => {
      // do not cache JSON response if there was a service error
      if (data.meta.success) {
        try {
          localStorage.setItem(
            requestPath,
            JSON.stringify({
              datetime: Date.now(),
              ...data,
            }),
          );
        } catch (exception) {
          // (e.g. localstorage cache hits it's limit)
          if (exception.DOMException) {
            // eslint-disable-next-line
            return response;
          }
        }
      }
    });

  return response;
}

function cacheHoursExpiry(hours) {
  return hours * 1000 * 60 * 60;
}

function checkRequestCache(requestURL) {
  const cachedResponse = localStorage.getItem(requestURL);

  if (cachedResponse) {
    const cachedResponseParsed = JSON.parse(cachedResponse);
    const timePassed = Date.now() - cachedResponseParsed.datetime;
    // TODO: move cacheHoursExpiry argument to constants
    const tooOld = timePassed > cacheHoursExpiry(1);

    const requestResponse = JSON.parse(cachedResponse);
    return !tooOld ? Promise.resolve(requestResponse) : null;
  }

  return null;
}

// @TODO cancel in-flight requests if page changes
function get({
  fetchOptions,
  requestApi,
  returnErrorResponse = true,
  useCache = false,
}) {
  const baseFetchOptions = {
    accept: "application/json",
    credentials: "same-origin",
  };

  const apiPath = `/api/1.0/${requestApi}`;

  if (useCache) {
    const cachedResponse = checkRequestCache(apiPath);

    if (cachedResponse) {
      return cachedResponse;
    }
  }

  return fetch(apiPath, { ...baseFetchOptions, fetchOptions })
    .then(checkResponseStatus)
    .then(setRequestCache)
    .then((response) => response.json())
    .catch((error) => handleError(error, returnErrorResponse));
}

const handleError = (error, returnResponse = false) => {
  // @TODO give user feedback on error
  // @TODO push error to health-monitoring service

  // @TODO there's probably a better way to do this
  if (returnResponse) {
    return Promise.resolve(error?.response.json());
  }
};

export const checkLoginStatus = () => {
  const cachedCurrentUser = Cookies.get("currentUser");

  return cachedCurrentUser || null;
};

export const logoutUser = () => {
  Cookies.remove("currentUser");
};

export const resolveUsername = (username) =>
  get({ requestApi: `username/${username}`, useCache: true });

export const fetchMultiplayerApps = () =>
  get({
    requestApi: "apps?filter_multiplayer=true",
    useCache: true,
    returnErrorResponse: true,
  });

export const fetchAccountDetails = (accountId) =>
  get({ requestApi: `accounts/${accountId}`, useCache: true });

export const fetchAccountApps = (accountId, includeExtendedData = false) => {
  let requestApi = `accounts/${accountId}/apps`;

  if (includeExtendedData) {
    requestApi += "?fields=developers,publishers,genres,time_to_beat";
  }

  return get({
    requestApi,
    useCache: true,
  });
};

export const fetchFriendsList = (accountId) =>
  get({
    requestApi: `accounts/${accountId}/friends`,
    useCache: true,
    returnErrorResponse: true,
  });
