import { useNavigate } from 'react-router-dom';
import merge from 'lodash/merge';
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch';

const retrieveToken = async () => {
  const token = await localStorage.getItem('token');
  return token;
};
const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};
const clearToken = () => {
  localStorage.removeItem('token');
};

const fetchJSONWithToken = async (url: string, options = {}) => {
  const token = await retrieveToken();
  const navigate = useNavigate();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  return fetchJSON(url, optionsWithToken);
};

// const shouldRefreshToken = (error: any) => error.response.status === 401;
const shouldRefreshToken = (error: any) => false;

const refreshToken = async () => {
  const token = await retrieveToken();
  return fetchJSONWithToken('/authenticate/refresh-token', {
    method: 'POST',
    body: JSON.stringify({
      accessToken: `${token}`,
    }),
  })
    .then((response: any) => {
      console.log(response.body.data);
      saveToken(response.body.data.token);
      return response;
    })
    .catch((error) => {
      clearToken();
      console.log('catched error, clearing token');
      throw error;
    });
};

export const apiFetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});
