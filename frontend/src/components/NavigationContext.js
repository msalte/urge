import React, { useContext, useState } from "react";

export const Locations = {
    blog: {
        key: "blog",
        displayName: "Blog",
        icon: "book",
        link: "/",
    },
    arduino: {
        key: "arduino",
        displayName: "Arduino",
        icon: "chart-bar",
        link: "/arduino",
    },
    github: {
        key: "github",
        displayName: "GitHub",
        icon: "code-branch",
        isExternal: true,
        link: "https://github.com/msalte/urge",
    },
    user: {
        key: "user",
        displayName: "User",
        icon: "user",
        link: "/user",
        visibleInSideBar: false,
    },
};

const NavigationContext = React.createContext({
    activeLocation: {},
    setActiveLocation: () => {},
});

export const ensureActiveLocation = item => {
    const ctx = useContext(NavigationContext);

    if (ctx.activeLocation !== item) {
        ctx.setActiveLocation(item);
    }
};

export const NavigationContextStateProvider = ({ children }) => {
    const [activeLocation, setActiveLocation] = useState(null);

    return (
        <NavigationContext.Provider
            value={{
                activeLocation: activeLocation,
                setActiveLocation: item => setActiveLocation(item),
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;
