const KEY_JWT_ID = "KEY_JWT_ID";
const KEY_THEME = "THEME";

const KEY_USER_PROFILE_ID = "KEY_USER_PROFILE_ID";
const KEY_USER_PROFILE_EMAIL = "KEY_USER_PROFILE_EMAIL";
const KEY_USER_PROFILE_NAME = "KEY_USER_PROFILE_NAME";

export const getJwtToken = () => {
    return localStorage.getItem(KEY_JWT_ID);
};

export const setJwtToken = jwt => {
    localStorage.setItem(KEY_JWT_ID, jwt);
};

export const clearJwtToken = () => {
    localStorage.removeItem(KEY_JWT_ID);
};

export const getTheme = () => {
    return localStorage.getItem(KEY_THEME);
};

export const setTheme = theme => {
    localStorage.setItem(KEY_THEME, theme);
};

export const setUserInfo = profile => {
    localStorage.setItem(KEY_USER_PROFILE_ID, profile.id);
    localStorage.setItem(KEY_USER_PROFILE_EMAIL, profile.email);
    localStorage.setItem(KEY_USER_PROFILE_NAME, profile.name);
};

export const getUserInfo = () => {
    return {
        id: localStorage.getItem(KEY_USER_PROFILE_ID),
        email: localStorage.getItem(KEY_USER_PROFILE_EMAIL),
        name: localStorage.getItem(KEY_USER_PROFILE_NAME),
    };
};

export const clearUserInfo = () => {
    localStorage.removeItem(KEY_USER_PROFILE_ID);
    localStorage.removeItem(KEY_USER_PROFILE_EMAIL);
    localStorage.removeItem(KEY_USER_PROFILE_NAME);
};
