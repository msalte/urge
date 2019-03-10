const KEY_JWT = "KEY_JWT";
const KEY_REFRESH_TOKEN = "KEY_REFRESH_TOKEN";

export const getJwtToken = () => {
    return localStorage.getItem(KEY_JWT);
};

export const getRefreshToken = () => {
    return localStorage.getItem(KEY_REFRESH_TOKEN);
};

export const setAuthTokens = (jwt, refreshToken) => {
    localStorage.setItem(KEY_JWT, jwt);
    localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken);
};
