const KEY_JWT = "KEY_JWT";
const KEY_REFRESH_TOKEN = "KEY_REFRESH_TOKEN";

const KEY_THEME = "THEME";

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

export const getTheme = () => {
    return localStorage.getItem(KEY_THEME);
};

export const setTheme = theme => {
    localStorage.setItem(KEY_THEME, theme);
};
