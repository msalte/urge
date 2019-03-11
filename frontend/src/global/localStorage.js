const KEY_JWT = "KEY_JWT";
const KEY_REFRESH_TOKEN = "KEY_REFRESH_TOKEN";

const KEY_THEME = "THEME";

const KEY_USER_PROFILE_ID = "KEY_USER_PROFILE_ID";
const KEY_USER_PROFILE_EMAIL = "KEY_USER_PROFILE_EMAIL";
const KEY_USER_PROFILE_NAME = "KEY_USER_PROFILE_NAME";

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

export const clearAuthTokens = () => {
    localStorage.removeItem(KEY_JWT);
    localStorage.removeItem(KEY_REFRESH_TOKEN);
};

export const getTheme = () => {
    return localStorage.getItem(KEY_THEME);
};

export const setTheme = theme => {
    localStorage.setItem(KEY_THEME, theme);
};

export const setUserProfile = profile => {
    localStorage.setItem(KEY_USER_PROFILE_ID, profile.id);
    localStorage.setItem(KEY_USER_PROFILE_EMAIL, profile.email);
    localStorage.setItem(KEY_USER_PROFILE_NAME, profile.name);
};

export const getUserProfile = () => {
    return {
        id: localStorage.getItem(KEY_USER_PROFILE_ID),
        email: localStorage.getItem(KEY_USER_PROFILE_EMAIL),
        name: localStorage.getItem(KEY_USER_PROFILE_NAME),
    };
};

export const clearUserProfile = () => {
    localStorage.removeItem(KEY_USER_PROFILE_ID);
    localStorage.removeItem(KEY_USER_PROFILE_EMAIL);
    localStorage.removeItem(KEY_USER_PROFILE_NAME);
};
