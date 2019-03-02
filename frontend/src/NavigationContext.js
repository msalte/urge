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
    user: {
        key: "user",
        displayName: "User",
        icon: "user",
        link: "/user",
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
