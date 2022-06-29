import merge from "lodash/merge";

// fetchJSON is bundled wrapper around fetch which simplifies working
// with JSON API:
//   * Automatically adds Content-Type: application/json to request headers
//   * Parses response as JSON when Content-Type: application/json header is
//     present in response headers
//   * Converts non-ok responses to errors
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";

// Provide your favorite token saving -- to cookies, local storage, ...
const retrieveToken = async () => {
  const token = await localStorage.getItem('token');
  return token;
};
const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};
// const clearToken = () => {
//   localStorage.removeItem('token');
// };

// Add token to the request headers
const fetchJSONWithToken = async (url: string, options = {}) => {
  const token = await retrieveToken();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return fetchJSON(url, optionsWithToken);
};

// Decide whether this error returned from API means that we want
// to try refreshing the token. error.response contains the fetch Response
// object, error.body contains the parsed JSON response body
const shouldRefreshToken = (error: any) =>
  error.response.status === 401;
    // && error.body.message === "Token has expired";

// Do the actual token refreshing and update the saved token
const refreshToken = async () => {
  const token = await retrieveToken();
  return fetchJSONWithToken("/authenticate/refresh-token", {
    method: "POST",
    body: JSON.stringify({
      accessToken: `${token}`,
    })
  })
    .then((response: any) => {
      console.log(response.body);
      saveToken(response.body.data.token);
      return response;
    })
    .catch((error) => {
      // If we failed by any reason in refreshing, just clear the token,
      // it's not that big of a deal
      // clearToken();
      console.log('catched error, but not deleting expired token from localstorage');
      throw error;
    });
};

export const apiFetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});
