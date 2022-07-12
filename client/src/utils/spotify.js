import axios from 'axios';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from './localStorage';

const BASEURL = `https://api.spotify.com/v1`;

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

axios.defaults.baseURL = BASEURL;
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getUserProfile = () => axios.get('/me');
export const getTopArtists = (time_range = 'short_term', limit = 10) =>
  axios.get(`/me/top/artists?time_range=${time_range}&limit=${limit}`);
export const getTopSongs = (time_range = 'short_term', limit = 10) =>
  axios.get(`/me/top/tracks?time_range=${time_range}&limit=${limit}`);
export const getFollowingArtists = (type = 'artist', limit = 6) =>
  axios.get(`/me/following?type=${type}&limit=${limit}`);
export const getCurrentlyPlayingSong = () =>
  axios.get('/me/player/currently-playing');
export const getParticularCategoryPlaylist = (category) =>
  axios.get(`/browse/categories/${category}/playlists`);
export const getPlaylistTracks = (playlistId) =>
  axios.get(`/playlists/${playlistId}/tracks`);
export const getArtistTracks = (artistId, countryCode) =>
  axios.get(`/artists/${artistId}/top-tracks?market=${countryCode}`);
export const getRelatedArtists = (artistId) =>
  axios.get(`/artists/${artistId}/related-artists`);
export const getArtistAlbums = (artistId, limit = 6) =>
  axios.get(`/artists/${artistId}/albums?limit=${limit}`);
export const getAlbumTracks = (albumId) =>
  axios.get(`/albums/${albumId}/tracks`);

export const categoriesURL = `${BASEURL}/browse/categories?limit=6`;
export const newReleasesURL = `${BASEURL}/browse/new-releases?limit=6`;
export const featuredPlaylistsURL = `${BASEURL}/browse/featured-playlists?limit=6`;

// export const getCategories = (limit = 6) =>
//   axios.get(`/browse/categories?limit=${limit}`);
// export const getNewReleases = (limit = 6) =>
//   axios.get(`/browse/new-releases?limit=${limit}`);
// export const getFeaturedPlaylist = (limit = 6) =>
//   axios.get(`/browse/featured-playlists?limit=${limit}`);
