import React, { useContext } from "react";

const NavigationContext = React.createContext({
    activeSideBarItem: {},
    setActiveSideBarItem: () => {},
});

export const SideBarItems = {
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
};

export const ensureSideBarItemActive = item => {
    const ctx = useContext(NavigationContext);

    if (ctx.activeSideBarItem !== item) {
        ctx.setActiveSideBarItem(item);
    }
};

export default NavigationContext;
