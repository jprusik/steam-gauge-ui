function checkResponseStatus(response) {
  if (response.ok) {
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
  const requestPath = response.url.replace(requestDomain,'');

  // TODO: do not cache JSON response returns {data: {success: false}}
  response.clone().json().then(data => {
    localStorage.setItem(requestPath, JSON.stringify({datetime:Date.now(), ...data}));
  });

  return response;
}


function cacheHoursExpiry(hours) {
  return (hours * 1000 * 60 * 60);
}


function checkRequestCache(requestURL) {
  const cachedResponse = localStorage.getItem(requestURL);

  if (cachedResponse) {
    const cachedResponseParsed = JSON.parse(cachedResponse);
    const timePassed = Date.now() - cachedResponseParsed.datetime;
    // TODO: move cacheHoursExpiry argument to constants
    const tooOld = timePassed > cacheHoursExpiry(12);

    const requestResponse = JSON.parse(cachedResponse);
    return !tooOld ? Promise.resolve(requestResponse) : null;
  }

  return null;
}


function cachedFetch(requestURL, fetchOptions){
  const cachedResponse = checkRequestCache(requestURL);
  if (cachedResponse) {
    return cachedResponse;
  }
  return fetch(requestURL, fetchOptions)
  .then(checkResponseStatus)
  .then(setRequestCache)
  .then(response => response.json())
  .catch(handleError);
}


// TODO: give user feedback on error
// TODO: push error to health-monitoring service
const handleError = (error) => {
  console.log('Something went horribly wrong: '+error.status);
};


export const checkLoginStatus = () => {
  const fetchOptions = {
    accept: 'application/json',
    cache: 'no-store',
    credentials: 'same-origin'
  }

  return fetch('/current_user', fetchOptions)
  .then(checkResponseStatus)
  .then(response => response.json())
  .catch(handleError);
}


export const fetchMultiplayerApps = () => {
  const fetchOptions = {
    accept: 'application/json',
    credentials: 'same-origin'
  }

  return cachedFetch('/api/1.0/apps?filter_multiplayer=true', fetchOptions);
};


export const fetchAccountDetails = (account_id) => {
  const fetchOptions = {
    accept: 'application/json',
    credentials: 'same-origin'
  }

  return cachedFetch(`/api/1.0/accounts/${account_id}`, fetchOptions)
};


export const fetchAccountApps = (account_id) => {
  const fetchOptions = {
    accept: 'application/json',
    credentials: 'same-origin'
  }

  return cachedFetch(`/api/1.0/accounts/${account_id}/apps`, fetchOptions);
};


export const fetchFriendsList = (account_id) => {
  const fetchOptions = {
    accept: 'application/json',
    credentials: 'same-origin'
  }

  return cachedFetch(`/api/1.0/accounts/${account_id}/friends`, fetchOptions);
};
