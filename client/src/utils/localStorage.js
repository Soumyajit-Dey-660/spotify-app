const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expiresIn: 'spotify_token_expiration_time',
    timestamp: 'spotify_token_timestamp'
}

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expiresIn: window.localStorage.getItem(LOCALSTORAGE_KEYS.expiresIn),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

export {LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES};
