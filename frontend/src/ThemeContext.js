import React, { useState } from "react";
import { setTheme, getTheme } from "./global/localStorage";

export const themes = {
    light: "light",
    dark: "dark",
};

const ThemeContext = React.createContext({
    theme: themes.light,
    toggle: () => {},
});

const useThemeToggler = () => {
    const defaultState = getTheme() || themes.light;
    const [activeTheme, setActiveTheme] = useState(defaultState);

    const toggleTheme = () => {
        const newTheme =
            activeTheme === themes.light ? themes.dark : themes.light;

        setActiveTheme(newTheme);
        setTheme(newTheme);
    };

    return [activeTheme, toggleTheme];
};

export const ThemeContextStateProvider = ({ children }) => {
    const [activeTheme, toggleTheme] = useThemeToggler();

    return (
        <ThemeContext.Provider
            value={{
                theme: activeTheme,
                toggle: () => toggleTheme(),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
