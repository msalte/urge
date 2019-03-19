import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";

const locations = {
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
        subMenu: {
            isDefaultOpen: false,
            isParentSelectable: false,
            items: [],
        },
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
    locations: {},
    locationsUpdated: null,
    activeLocation: {},
    activeSubMenuItem: {},
    setActiveLocation: () => {},
});

const randomString = () => Math.random().toString(36);

const addOrRemoveArduinoAdminItem = (isLoggedIn, onComplete) => {
    const {
        arduino: { subMenu },
    } = locations;

    const adminItem = {
        key: "admin",
        isAdmin: true,
        displayName: "Admin",
        link: "/arduino/admin",
        shortName: "ADM",
    };

    const itemIndex = subMenu.items.findIndex(i => i.key === adminItem.key);

    if (itemIndex === -1 && isLoggedIn) {
        subMenu.items.unshift(adminItem);
    } else if (itemIndex !== -1 && !isLoggedIn) {
        subMenu.items.splice(itemIndex, 1);
    }

    onComplete();
};

const addArduinoSubMenuItems = onComplete => {
    const {
        arduino: { subMenu },
    } = locations;

    if (subMenu.items.length === 0) {
        fetch(serviceDiscovery.getArduinoApi() + "/data/dates").then(data => {
            data.forEach(date => {
                const sn = date.replace("-", "").substring(0, 4);
                subMenu.items.push({
                    key: date,
                    displayName: date,
                    link: `/arduino/${date}`,
                    shortName: sn,
                });
            });

            onComplete();
        });
    }
};

export const NavigationContextStateProvider = ({ children }) => {
    const userContext = useContext(UserContext);

    const [activeLocation, setActiveLocation] = useState(null);
    const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(null);

    const onEffectCompleteCallback = () => setUpdateTrigger(randomString());

    useEffect(() => {
        addArduinoSubMenuItems(onEffectCompleteCallback);
    }, []);

    useEffect(() => {
        const { isLoggedIn } = userContext;

        addOrRemoveArduinoAdminItem(isLoggedIn, onEffectCompleteCallback);
    }, [userContext.isLoggedIn]);

    const handleActiveLocationChanged = loc => {
        setActiveLocation(loc);

        if (loc.subMenu) {
            // the new location has a sub menu, check if active sub menu item is present

            const subMenuItem = loc.subMenu.items.find(
                i => i === activeSubMenuItem
            );

            if (!subMenuItem && activeSubMenuItem) {
                setActiveSubMenuItem(null);
            }
        } else {
            setActiveSubMenuItem(null);
        }
    };

    return (
        <NavigationContext.Provider
            value={{
                updateTrigger,
                locations,
                activeLocation,
                activeSubMenuItem,
                setActiveLocation: loc => handleActiveLocationChanged(loc),
                setActiveSubMenuItem: item => setActiveSubMenuItem(item),
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;
