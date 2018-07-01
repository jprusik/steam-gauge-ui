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

// TODO: give user feedback on error
// TODO: push error to health-monitoring service
const handleError = (error) => {
  console.log('Something went horribly wrong: '+error.status);
}

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
