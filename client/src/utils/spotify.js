import axios from 'axios';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from './localStorage';

const logout = () => {
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  window.location = window.location.origin;
};

const refreshToken = async () => {
  try {
    if (
      LOCALSTORAGE_KEYS.refreshToken === null ||
      LOCALSTORAGE_KEYS.refreshToken === undefined
    ) {
      console.log('No refresh token available');
      logout();
    }
    const { data } = await axios.get(
      `http://localhost:5001/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const hasTokenExpired = () => {
  const { accessToken, timestamp, expiresIn } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expiresIn);
};

const getAccessToken = () => {
  // WTF?? TODO: localstorage access token undefined but check says otherwise
  //console.log(LOCALSTORAGE_VALUES.accessToken === 'undefined')
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hasError = urlParams.get('error');

  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === 'undefined'
  ) {
    refreshToken(); // get the new access token using the refresh token
  }

  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== undefined
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // When the user logs in for the first time
  if (
    urlParams.get('access_token') &&
    urlParams.get('access_token') !== undefined
  ) {
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      urlParams.get('access_token')
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.refreshToken,
      urlParams.get('refresh_token')
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.expiresIn,
      urlParams.get('expires_in')
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    return urlParams.get('access_token');
  }
  return null;
};

const accessToken = getAccessToken();

export { accessToken, logout };

axios.defaults.baseURL = `https://api.spotify.com/v1`;
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getUserProfile = () => axios.get('/me');
export const getTopArtists = (time_range = 'medium_term', limit = 10) =>
  axios.get(`/me/top/artists?time_range=${time_range}&limit=${limit}`);
export const getTopSongs = (type, time_range = 'medium_term', limit = 10) =>
  axios.get(`/me/top/tracks?time_range=${time_range}&limit=${limit}`);
