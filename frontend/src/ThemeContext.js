import React from "react";

export const themes = {
    light: "light",
    dark: "dark",
};

export default React.createContext({
    theme: themes.light,
    toggle: () => {},
});
